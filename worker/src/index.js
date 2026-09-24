// Cloudflare Worker: proxies the WeRepairSubZero booking form to Telegram.
//
// The site (static export on GitHub Pages) POSTs the form fields here as JSON.
// This Worker builds the Telegram message and sends it using BOT_TOKEN / CHAT_ID,
// which live only in Cloudflare's encrypted secret store (env.BOT_TOKEN /
// env.CHAT_ID) — never in the browser bundle, never in git.

const ALLOWED_ORIGINS = new Set([
  "https://werepairsubzero.com",
  "https://www.werepairsubzero.com",
]);

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
    const date = clean(body.date, 30);
    const time = clean(body.time, 60);

    if (!name || !phone || !address || !zip || !issue || !date || !time) {
      return new Response("Missing required fields", { status: 400, headers });
    }

    const text =
      `🔧 New Booking — WeRepairSubZero\n\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `📍 Address: ${address}, ZIP: ${zip}\n` +
      `📅 Date: ${date}, Time: ${time}\n` +
      `🔧 Issue: ${issue}`;

    const tgResponse = await fetch(
      `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.CHAT_ID, text }),
      }
    );

    if (!tgResponse.ok) {
      return new Response("Failed to send message", { status: 502, headers });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  },
};
