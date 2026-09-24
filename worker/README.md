# Booking proxy (Cloudflare Worker)

Keeps the Telegram `BOT_TOKEN` off the browser. The site POSTs the booking
form fields here as JSON; the Worker builds the Telegram message server-side
and sends it using secrets stored in Cloudflare (never in git, never in the
GitHub Pages build).

## One-time setup

```bash
cd worker
npm install -g wrangler   # if you don't have it yet
wrangler login            # opens a browser to link your (free) Cloudflare account

wrangler secret put BOT_TOKEN
# paste your Telegram bot token when prompted

wrangler secret put CHAT_ID
# paste 6743461485 when prompted

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

## Redeploying after code changes

```bash
cd worker
wrangler deploy
```

No further GitHub secrets or DNS changes are needed — the Worker runs on
Cloudflare's free `workers.dev` subdomain and is independent of GitHub Pages
and Hostinger DNS.
