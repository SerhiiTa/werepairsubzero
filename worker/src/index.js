// Cloudflare Worker: booking intake for WeRepairSubZero.
//
// The site (static export on GitHub Pages) POSTs the form fields here as JSON.
// This Worker is the single server-side hop between the browser and:
//   1. WRA CRM  — the booking-persistence authority. The browser-facing
//      success/failure of a submission is decided ONLY by this call.
//   2. Telegram — a best-effort notification channel. Its outcome never
//      changes whether the booking is reported as successful.
//
// Secrets (BOT_TOKEN, CHAT_ID, WRA_SOURCE_SECRET) live only in Cloudflare's
// encrypted secret store (env.*) — never in git, never in the browser bundle,
// never logged.

const ALLOWED_ORIGINS = new Set([
  "https://werepairsubzero.com",
  "https://www.werepairsubzero.com",
]);

const WRA_ENDPOINT =
  "https://werepairrefrigerators.vercel.app/api/public/inbound/website";
const WRA_PUBLIC_KEY = "wra_a5d5efbef8a9fa57264c0b3d011bf622";

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

export default {
  async fetch(request, env) {
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

    // ── 1. WRA CRM — booking-persistence authority ──────────────────────
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

    let wraSuccess = false;
    try {
      const wraResponse = await fetch(WRA_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `WRA-Source ${WRA_PUBLIC_KEY}:${env.WRA_SOURCE_SECRET}`,
        },
        body: JSON.stringify(wraPayload),
      });

      let wraJson = null;
      try {
        wraJson = await wraResponse.json();
      } catch {
        wraJson = null;
      }

      wraSuccess =
        wraResponse.ok === true &&
        wraJson?.ok === true &&
        wraJson?.accepted === true &&
        wraJson?.persisted === true;
    } catch {
      wraSuccess = false;
    }

    // ── 2. Telegram — best-effort notification, never affects the result ─
    const text =
      `🔧 New Booking — WeRepairSubZero\n\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `📍 Address: ${address}, ZIP: ${zip}\n` +
      `📅 Date: ${formatDateForDisplay(date)}, Time: ${time}\n` +
      `🔧 Issue: ${issue}` +
      (wraSuccess ? "" : `\n\n⚠️ WRA CRM submission FAILED — follow up manually.`);

    try {
      await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.CHAT_ID, text }),
      });
    } catch {
      // Telegram is a notification channel only — its failure must never
      // change whether the browser sees the booking as successful.
    }

    // ── 3. Respond to the browser based on WRA's result only ────────────
    if (!wraSuccess) {
      return new Response(JSON.stringify({ ok: false }), {
        status: 502,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  },
};
