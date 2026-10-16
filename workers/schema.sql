-- Guestbook table for brysontang.com
-- Run with: wrangler d1 execute guestbook-db --file=./schema.sql

CREATE TABLE IF NOT EXISTS guestbook (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_hash TEXT,
  created_at TEXT NOT NULL,
  -- Optional, from MCP leave_message (mcp.brysontang.com); never shown publicly
  agent_id TEXT,
  contact TEXT
);

-- Index for faster ordering by date
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON guestbook(created_at DESC);

-- Meeting requests from the MCP request_time perk (resume-mcp); never shown publicly
CREATE TABLE IF NOT EXISTS meeting_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  reason TEXT NOT NULL,
  timezone TEXT,
  availability TEXT,
  guestbook_name TEXT,
  ip_hash TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Stories behind the resume, served to guestbook signers by the MCP list_stories / get_story perks
CREATE TABLE IF NOT EXISTS stories (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  body_md TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published INTEGER NOT NULL DEFAULT 0
);
