-- Guestbook table for brysontang.com
-- Run with: wrangler d1 execute guestbook-db --file=./schema.sql

CREATE TABLE IF NOT EXISTS guestbook (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_hash TEXT,
  created_at TEXT NOT NULL
);

-- Index for faster ordering by date
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON guestbook(created_at DESC);
