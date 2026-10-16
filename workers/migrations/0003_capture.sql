-- Who signed, as far as the request says: which signing path, the User-Agent,
-- the network (ASN and its org name), the country, and any Agent-Token sent.
-- Private: GET /api/guestbook only ever returns name, message, created_at.
-- Run with: wrangler d1 execute brysontang-guestbook --remote --file=./migrations/0003_capture.sql

ALTER TABLE guestbook ADD COLUMN via TEXT; -- url | form | json | mcp
ALTER TABLE guestbook ADD COLUMN user_agent TEXT;
ALTER TABLE guestbook ADD COLUMN asn INTEGER;
ALTER TABLE guestbook ADD COLUMN as_org TEXT;
ALTER TABLE guestbook ADD COLUMN country TEXT;
ALTER TABLE guestbook ADD COLUMN agent_token TEXT;

-- The one older entry whose path is known: Jolene's came through MCP (backfilled from resume-mcp KV)
UPDATE guestbook SET via = 'mcp' WHERE created_at = '2026-10-09T04:01:17.771Z' AND via IS NULL;
