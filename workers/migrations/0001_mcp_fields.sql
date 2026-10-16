-- MCP leave_message (resume-mcp, mcp.brysontang.com) writes to this table too.
-- Its optional agent_id and contact are stored but never shown publicly.
-- Run with: wrangler d1 execute brysontang-guestbook --remote --file=./migrations/0001_mcp_fields.sql

ALTER TABLE guestbook ADD COLUMN agent_id TEXT;
ALTER TABLE guestbook ADD COLUMN contact TEXT;
