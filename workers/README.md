# Cloudflare Workers - API Backend

This directory contains the Cloudflare Worker that powers the visitor counter and guestbook for [brysontang.com](https://brysontang.com).

## Features

- **Visitor Counter**: Persistent hit counter stored in KV
- **Guestbook API**: entries in D1 (SQLite), signable from the site's JS, a plain form post, or a bare GET URL (for AI agents that can only fetch)
- **One store**: the MCP server's `leave_message` (resume-mcp, mcp.brysontang.com) writes to the same D1 table
- **Rate Limiting**: 1 post per hour per IP (stored in KV)
- **Honeypot Protection**: Hidden field to catch bots
- **Placeholder text turned away**: example values and unfilled templates (`<your-name>`) get instructions instead of an entry
- **Privacy**: IPs are hashed, never stored raw. Who signed (path, User-Agent, network, country, Agent-Token) is stored but never returned publicly

## Architecture

```
┌─────────────────┐     ┌──────────────────────┐
│  brysontang.com │────▶│  Cloudflare Worker   │
│ (Cloudflare     │     │  /api/counter        │
│  Pages)         │     │  /api/guestbook      │
└─────────────────┘     │  /api/guestbook/sign │
                        └──────────┬───────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
             ┌─────────────┐              ┌─────────────┐
             │  KV Store   │              │  D1 (SQLite)│
             │  - counter  │              │  - guestbook│
             │  - rate lim │              │    entries  │
             └─────────────┘              └─────────────┘
```

## Setup

### Prerequisites

1. [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier works)
2. [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

```bash
npm install -g wrangler
wrangler login
```

### Step 1: Create KV Namespace

```bash
wrangler kv:namespace create "SITE_KV"
```

Save the output ID - you'll need it for `wrangler.toml`.

### Step 2: Create D1 Database

```bash
wrangler d1 create brysontang-guestbook
```

Save the database ID from the output.

### Step 3: Configure wrangler.toml

```bash
cp wrangler.toml.example wrangler.toml
```

Edit `wrangler.toml` and fill in:

- `account_id` - Your Cloudflare account ID
- KV namespace `id` - From step 1
- D1 `database_id` - From step 2

### Step 4: Initialize the Database

```bash
wrangler d1 execute brysontang-guestbook --remote --file=./schema.sql
```

`schema.sql` is the full current schema for a fresh database. An existing database is brought up to date with the files in `migrations/`, in order.

### Step 5: Set Secrets

```bash
# Generate a random salt for IP hashing
wrangler secret put IP_SALT
# Enter a random string when prompted (e.g., output of `openssl rand -hex 32`)
```

### Step 6: Deploy

```bash
wrangler deploy
```

Your API will be available at `https://brysontang-api.<your-subdomain>.workers.dev`

## API Endpoints

### GET /api/counter

Increments and returns the visitor count.

**Response:**

```json
{
  "count": 18542,
  "display": "018542"
}
```

### GET /api/guestbook

Returns the 50 most recent guestbook entries.

**Response:**

```json
[
  {
    "name": "Visitor",
    "message": "Great site!",
    "created_at": "2025-01-15T10:30:00Z"
  }
]
```

### POST /api/guestbook

Creates a new guestbook entry.

**Request:**

```json
{
  "name": "Your Name",
  "message": "Your message here"
}
```

**Response:**

```json
{
  "success": true,
  "entry": {
    "name": "Your Name",
    "message": "Your message here",
    "created_at": "2025-01-15T10:30:00Z"
  }
}
```

**Error responses:**

- `400` - Invalid input (missing fields, too long, or example/placeholder text)
- `429` - Rate limited (1 post per hour)

The same endpoint also takes a plain form post (`application/x-www-form-urlencoded`) from the guestbook page with JS off. It answers with a `303` back to `/guestbook/?signed=1` or `?error=<code>`.

JSON and form posts must come from brysontang.com (Origin or Referer).

### GET /api/guestbook/sign

Signs from a bare URL, for AI agents whose only tool is a URL fetcher. No origin check.

```
https://api.brysontang.com/api/guestbook/sign?name=<your-name>&message=<your-message>
```

Answers in plain text. A bare visit returns instructions. Example text or unfilled placeholders return instructions and store nothing (`200`, so restricted fetchers still read them).

## Local Development

```bash
wrangler dev
```

This starts a local server at `http://localhost:8787` with access to your KV and D1 bindings.

## Security Notes

- The `website` field in POST requests is a honeypot - it should never be filled by humans (it's hidden via CSS). Bots that fill it are silently rejected.
- IPs are hashed with a secret salt before storage - raw IPs are never persisted.
- Rate limiting prevents spam (1 entry per IP per hour).
- CORS is configured - update the `Access-Control-Allow-Origin` header in production.

## Cost

Cloudflare Workers free tier includes:

- 100,000 requests/day
- 1GB KV storage
- 5GB D1 storage

More than enough for a personal portfolio site.

## License

MIT - Feel free to fork and adapt for your own site!
