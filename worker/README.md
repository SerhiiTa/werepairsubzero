# Booking intake (Cloudflare Worker)

The site POSTs the booking form fields here as JSON. This Worker is the one
server-side hop between the browser and:

1. **WRA CRM** — booking-persistence authority. The browser only sees a
   successful booking if WRA confirms `ok: true, accepted: true, persisted: true`.
2. **Telegram** — best-effort notification only. A Telegram failure never
   flips a WRA-successful booking to a failure (and vice versa).

All three secrets (`BOT_TOKEN`, `CHAT_ID`, `WRA_SOURCE_SECRET`) live only in
Cloudflare's encrypted secret store — never in git, never in the GitHub Pages
build, never logged.

## One-time setup

```bash
cd worker
npm install -g wrangler   # if you don't have it yet
wrangler login            # opens a browser to link your (free) Cloudflare account

wrangler secret put BOT_TOKEN
# paste your Telegram bot token when prompted

wrangler secret put CHAT_ID
# paste 6743461485 when prompted

wrangler secret put WRA_SOURCE_SECRET
# paste the WRA secret (provided separately by the WRA team) when prompted

wrangler deploy
```

`wrangler deploy` prints a URL like:

```
https://werepairsubzero-booking.<your-subdomain>.workers.dev
```

Copy that URL into `BOOKING_ENDPOINT` in `app/components/BookingModal.tsx`.

## Rotate the leaked token

The current `BOT_TOKEN` has been sitting in the public GitHub Pages JS bundle,
so treat it as compromised:

1. In Telegram, message **@BotFather** → `/mybots` → select `@Werepairsubzero_bot`
   → **API Token** → **Revoke current token**.
2. Use the new token for `wrangler secret put BOT_TOKEN` above.

## After deploying

Remove `NEXT_PUBLIC_BOT_TOKEN` and `NEXT_PUBLIC_CHAT_ID` from the repo's
GitHub Actions secrets (Settings → Secrets and variables → Actions) — the
build no longer needs them.

## WRA CRM integration

- Endpoint: `https://werepairrefrigerators.vercel.app/api/public/inbound/website`
- Auth header: `Authorization: WRA-Source <PUBLIC_KEY>:<SECRET>` — the public
  key (`wra_a5d5efbef8a9fa57264c0b3d011bf622`) is hardcoded in `src/index.js`
  (it's not sensitive); the secret comes from `env.WRA_SOURCE_SECRET`.
- `providerEventId` is generated once per submission attempt on the frontend
  (`app/components/BookingModal.tsx`, in `handleSubmit`) as
  `werepairsubzero-<uuid>`, and sent through unchanged — this is what lets
  WRA de-duplicate a retried submission instead of creating a second booking.
- Do **not** send `companyId` or `inboundSourceId` — WRA derives those from
  the credential.

## Redeploying after code changes

```bash
cd worker
wrangler deploy
```

No further GitHub secrets or DNS changes are needed — the Worker runs on
Cloudflare's free `workers.dev` subdomain and is independent of GitHub Pages
and Hostinger DNS.
