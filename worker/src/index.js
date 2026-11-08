// Cloudflare Worker: booking intake for WeRepairSubZero.
//
// The site (static export on GitHub Pages) POSTs the form fields here as JSON.
// The Worker validates them and answers the browser immediately with
// {ok:true}; everything else runs in the background via ctx.waitUntil:
//   1. WRA CRM  — the booking-persistence system. One retry after 2s.
//   2. Telegram — always notified, with the CRM outcome in the message.
//   3. KV       — last-resort storage when BOTH CRM and Telegram failed.
//
// Idempotency: providerEventId (one UUID per form session, reused on retry)
// is recorded in KV for 24h; a repeated id is acknowledged but not processed.
//
// Secrets (BOT_TOKEN, CHAT_ID, WRA_SOURCE_SECRET) live only in Cloudflare's
// encrypted secret store (env.*) — never in git, never in the browser bundle,
// never logged. KV binding: env.BOOKINGS_KV (see wrangler.toml).

const ALLOWED_ORIGINS = new Set([
  "https://werepairsubzero.com",
  "https://www.werepairsubzero.com",
]);

const WRA_ENDPOINT =
  "https://werepairrefrigerators.vercel.app/api/public/inbound/website";
const WRA_PUBLIC_KEY = "wra_a5d5efbef8a9fa57264c0b3d011bf622";

// Worst case in the background: 8s + 2s + 8s (CRM) + 8s (Telegram) stays
// under the ~30s Cloudflare allows waitUntil work after the response.
const WRA_TIMEOUT_MS = 8000;
const WRA_RETRY_DELAY_MS = 2000;
const TELEGRAM_TIMEOUT_MS = 8000;

const IDEMPOTENCY_TTL_SECONDS = 24 * 60 * 60;
const idempotencyKey = (id) => `idem:${id}`;
const failedLeadKey = (id) => `failed:${id}`;

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function clean(value, maxLen = 300) {
  return String(value ?? "").trim().slice(0, maxLen);
}

// Expects an ISO date (yyyy-mm-dd) from the form; used only for the
// human-readable Telegram message. WRA gets the raw ISO date.
function formatDateForDisplay(isoDate) {
  if (!isoDate) return isoDate;
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return isoDate;
  return `${m}/${d}/${y}`;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function json(body, headers, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

async function sendToWra(payload, env) {
  try {
    const res = await fetch(WRA_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `WRA-Source ${WRA_PUBLIC_KEY}:${env.WRA_SOURCE_SECRET}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WRA_TIMEOUT_MS),
    });
    const data = await res.json().catch(() => null);
    return (
      res.ok === true &&
      data?.ok === true &&
      data?.accepted === true &&
      data?.persisted === true
    );
  } catch {
    return false;
  }
}

async function sendToTelegram(text, env) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text }),
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Runs after the browser already has its {ok:true}.
async function processBooking(lead, env) {
  const { providerEventId } = lead;

  let crmSaved = await sendToWra(lead.wraPayload, env);
  if (!crmSaved) {
    await sleep(WRA_RETRY_DELAY_MS);
    crmSaved = await sendToWra(lead.wraPayload, env);
  }
  if (!crmSaved) console.error(`WRA CRM failed twice for ${providerEventId}`);

  const text =
    `🔧 New Booking — WeRepairSubZero\n\n` +
    `👤 Name: ${lead.name}\n` +
    `📞 Phone: ${lead.phone}\n` +
    `📍 Address: ${lead.address}, ZIP: ${lead.zip}\n` +
    `📅 Date: ${formatDateForDisplay(lead.date)}, Time: ${lead.time}\n` +
    `🔧 Issue: ${lead.issue}\n\n` +
    (crmSaved ? "CRM: saved" : "⚠️ CRM FAILED — save this lead manually");

  const telegramSent = await sendToTelegram(text, env);
  if (!telegramSent) console.error(`Telegram notification failed for ${providerEventId}`);

  if (!crmSaved && !telegramSent) {
    // Nobody has this lead yet — keep it in KV (no TTL) for manual recovery.
    try {
      await env.BOOKINGS_KV.put(
        failedLeadKey(providerEventId),
        JSON.stringify({ ...lead, failedAt: new Date().toISOString() })
      );
      console.error(`LEAD NOT DELIVERED — stored in KV as ${failedLeadKey(providerEventId)}`);
    } catch (err) {
      console.error(`LEAD LOST — CRM, Telegram and KV all failed for ${providerEventId}: ${err?.name || "Error"}`);
    }
  }
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (!ALLOWED_ORIGINS.has(origin)) {
      return new Response("Forbidden", { status: 403, headers });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400, headers });
    }

    const name = clean(body.name, 100);
    const phone = clean(body.phone, 30);
    const address = clean(body.address, 200);
    const zip = clean(body.zip, 10);
    const issue = clean(body.issue, 1000);
    const date = clean(body.date, 30); // ISO yyyy-mm-dd, as produced by <input type="date">
    const time = clean(body.time, 60);
    const page = clean(body.page, 500);

    // The frontend generates one ID per submission attempt (not per retry),
    // so a retried request carries the SAME id here. If it's ever missing,
    // fall back to generating one so WRA still gets a stable-for-this-call id.
    const providerEventId =
      clean(body.providerEventId, 150) || `werepairsubzero-${crypto.randomUUID()}`;

    if (!name || !phone || !address || !zip || !issue || !date || !time) {
      return new Response("Missing required fields", { status: 400, headers });
    }

    // ── Idempotency: a repeated id is acknowledged, not processed again ──
    // KV is eventually consistent (a write can take up to ~60s to reach other
    // Cloudflare locations), so this guards retries, not simultaneous taps —
    // the form blocks those itself. A KV error must never block a lead.
    try {
      if (await env.BOOKINGS_KV.get(idempotencyKey(providerEventId))) {
        return json({ ok: true, duplicate: true }, headers);
      }
      await env.BOOKINGS_KV.put(idempotencyKey(providerEventId), "1", {
        expirationTtl: IDEMPOTENCY_TTL_SECONDS,
      });
    } catch (err) {
      console.error(`Idempotency check failed for ${providerEventId}: ${err?.name || "Error"}`);
    }

    const wraPayload = {
      providerEventId,
      customer: { name, phone },
      serviceAddress: {
        formatted: `${address}, ${zip}`,
        postalCode: zip,
      },
      requestedService: {
        serviceType: "Refrigerator Repair",
        applianceType: "Refrigerator",
        brand: "Sub-Zero",
        problemDescription: issue,
      },
      requestedAppointment: {
        date,
        preferredWindow: time,
        timezone: "America/Chicago",
      },
      attribution: {
        websiteDomain: "werepairsubzero.com",
        landingPageUrl: page || "https://werepairsubzero.com",
      },
    };

    ctx.waitUntil(
      processBooking(
        { providerEventId, name, phone, address, zip, issue, date, time, page, wraPayload },
        env
      )
    );

    return json({ ok: true }, headers);
  },
};
