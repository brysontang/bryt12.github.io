# Cloudflare Workers - API Backend

This directory contains the Cloudflare Worker that powers the visitor counter and guestbook for [brysontang.dev](https://brysontang.dev).

## Features

- **Visitor Counter**: Persistent hit counter stored in KV
- **Guestbook API**: CRUD operations with D1 (SQLite)
- **Rate Limiting**: 1 post per hour per IP (stored in KV)
- **Honeypot Protection**: Hidden field to catch bots
- **Privacy**: IPs are hashed, never stored raw

## Architecture

```
┌─────────────────┐     ┌──────────────────────┐
│  brysontang.dev │────▶│  Cloudflare Worker   │
│  (GitHub Pages) │     │  /api/counter        │
└─────────────────┘     │  /api/guestbook      │
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
wrangler d1 create guestbook-db
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
wrangler d1 execute guestbook-db --file=./schema.sql
```

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
- `400` - Invalid input (missing fields, too long)
- `429` - Rate limited (1 post per hour)

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
