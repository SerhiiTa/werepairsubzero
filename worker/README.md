# Booking intake (Cloudflare Worker)

The site POSTs the booking form fields here as JSON. The Worker validates
them and **answers `{ok: true}` immediately** — the customer never waits on
the CRM or Telegram. The rest runs in the background (`ctx.waitUntil`):

1. **WRA CRM** — the booking is saved there if WRA confirms
   `ok: true, accepted: true, persisted: true`. On an error or timeout (8s)
   the Worker retries once after 2s.
2. **Telegram** — always gets the booking, ending with either
   `CRM: saved` or `⚠️ CRM FAILED — save this lead manually`.
3. **KV** — if both the CRM and Telegram failed, the lead is stored in KV as
   `failed:<providerEventId>` (no expiry) and a `console.error` is logged.

Because the browser gets `ok: true` before the CRM answers, a CRM outage no
longer shows the customer an error — watch Telegram for `CRM FAILED`
messages and check KV for `failed:*` keys.

**Idempotency.** Each request carries `providerEventId` (one UUID per form
session, reused when the customer presses Submit again). The Worker records
it in KV as `idem:<providerEventId>` for 24 hours; a request with an id
already seen returns `{ok: true, duplicate: true}` and is not processed again.

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

wrangler kv namespace create BOOKINGS_KV
# paste the printed id into wrangler.toml (see "KV setup" below)

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
- `providerEventId` is generated once per form session on the frontend
  (`app/components/BookingModal.tsx`, in `openModal`) as
  `werepairsubzero-<uuid>`, and sent through unchanged. The Worker drops a
  repeated id itself (KV, 24h), and WRA receives the same id on the Worker's
  own retry, so it can de-duplicate that too.
- Do **not** send `companyId` or `inboundSourceId` — WRA derives those from
  the credential.

## KV setup

The Worker needs a KV namespace bound as `BOOKINGS_KV`. Create it once:

```bash
cd worker
wrangler kv namespace create BOOKINGS_KV
```

It prints an `id`; put it in `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "BOOKINGS_KV"
id = "<the id printed above>"
```

The id is not a secret — it's safe to commit.

Keys the Worker writes:

| Key | Value | Expiry |
| --- | --- | --- |
| `idem:<providerEventId>` | `"1"` | 24 hours |
| `failed:<providerEventId>` | full lead as JSON, plus `failedAt` | never — delete after recovering |

Find and read undelivered leads:

```bash
wrangler kv key list --binding BOOKINGS_KV --prefix failed: --remote
wrangler kv key get --binding BOOKINGS_KV "failed:<providerEventId>" --remote
wrangler kv key delete --binding BOOKINGS_KV "failed:<providerEventId>" --remote
```

Background errors (CRM failed twice, Telegram failed, lead stored in KV) are
visible with `wrangler tail` or in the Cloudflare dashboard → Workers →
werepairsubzero-booking → Logs.

## Redeploying after code changes

```bash
cd worker
wrangler deploy
```

No further GitHub secrets or DNS changes are needed — the Worker runs on
Cloudflare's free `workers.dev` subdomain and is independent of GitHub Pages
and Hostinger DNS.
