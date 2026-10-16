-- Perks for guestbook signers on the MCP server (resume-mcp, mcp.brysontang.com):
-- request_time stores meeting requests here (never shown publicly), and
-- list_stories / get_story read published stories behind the resume.
-- Run with: wrangler d1 execute brysontang-guestbook --remote --file=./migrations/0002_meeting_requests.sql

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

CREATE TABLE IF NOT EXISTS stories (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT,
  body_md TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published INTEGER NOT NULL DEFAULT 0
);
