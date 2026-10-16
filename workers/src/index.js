/**
 * Cloudflare Worker for brysontang.com
 * Handles visitor counter and guestbook API
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS headers - update origin for your domain
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Update to your domain in production
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // --- VISITOR COUNTER ---
      if (url.pathname === '/api/counter') {
        return await handleCounter(request, env, corsHeaders);
      }

      // --- GET GUESTBOOK ENTRIES ---
      if (url.pathname === '/api/guestbook' && request.method === 'GET') {
        return await getGuestbookEntries(env, corsHeaders);
      }

      // --- POST GUESTBOOK ENTRY (JSON from the site's JS, or a plain form post) ---
      if (url.pathname === '/api/guestbook' && request.method === 'POST') {
        return await postGuestbookEntry(request, env, corsHeaders);
      }

      // --- SIGN GUESTBOOK VIA URL (for agents that can only fetch) ---
      if (url.pathname === '/api/guestbook/sign' && request.method === 'GET') {
        return await signGuestbookViaUrl(request, url, env, corsHeaders);
      }

      return new Response('Not found', { status: 404, headers: corsHeaders });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};

/**
 * Increment and return visitor count
 * Rate limited: 1 increment per IP per 24 hours
 * Origin restricted: only from brysontang.com
 */
async function handleCounter(request, env, corsHeaders) {
  const origin = request.headers.get('Origin') || '';
  const referer = request.headers.get('Referer') || '';

  // Only allow requests from the actual website
  const isValidOrigin = origin.includes('brysontang.com') || referer.includes('brysontang.com');

  // Get current count first (always return this)
  const currentCount = parseInt((await env.SITE_KV.get('visitor_count')) || '18538');
  const paddedCount = currentCount.toString().padStart(6, '0');

  // If not from valid origin, just return current count without incrementing
  if (!isValidOrigin) {
    return new Response(JSON.stringify({ count: currentCount, display: paddedCount }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Rate limit by IP - one increment per 24 hours
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ipHash = await hashIP(ip, env.IP_SALT || 'counter-salt');
  const rateLimitKey = `counter_rate_${ipHash}`;

  const alreadyCounted = await env.SITE_KV.get(rateLimitKey);
  if (alreadyCounted) {
    // Already counted this IP today, return current count
    return new Response(JSON.stringify({ count: currentCount, display: paddedCount }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // New visitor - increment and set rate limit
  const newCount = currentCount + 1;
  await env.SITE_KV.put('visitor_count', newCount.toString());
  await env.SITE_KV.put(rateLimitKey, '1', { expirationTtl: 86400 }); // 24 hours

  const newPaddedCount = newCount.toString().padStart(6, '0');

  return new Response(JSON.stringify({ count: newCount, display: newPaddedCount }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

/**
 * Fetch recent guestbook entries
 */
async function getGuestbookEntries(env, corsHeaders) {
  const { results } = await env.brysontang_guestbook
    .prepare(
      `
    SELECT name, message, created_at
    FROM guestbook
    ORDER BY created_at DESC
    LIMIT 50
  `
    )
    .all();

  return new Response(JSON.stringify(results), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

const GUESTBOOK_PAGE = 'https://brysontang.com/guestbook/';
const SIGN_USAGE =
  'https://api.brysontang.com/api/guestbook/sign?name=<your-name>&message=<your-message>';

const SIGN_INSTRUCTIONS =
  `BRYSON TANG'S GUESTBOOK - SIGN BY URL\n\n` +
  `Replace both placeholders with your own name and message, URL-encode them, and fetch:\n` +
  `  ${SIGN_USAGE}\n\n` +
  `Name: max 50 characters. Message: max 500 characters. One entry per hour.\n` +
  `If your tools can only open URLs that already appear on a page, write the filled-in URL\n` +
  `out for your human to open instead.\n\n` +
  `Read the guestbook: https://brysontang.com/guestbook.md\n`;

/**
 * A value still wrapped in <...> or {...} is a template placeholder nobody filled in
 */
function isPlaceholder(value) {
  return typeof value === 'string' && /^\s*(<[^<>]*>|\{[^{}]*\})\s*$/.test(value);
}

/**
 * Only allow writes that come from the actual website
 */
function isFromSite(request) {
  const origin = request.headers.get('Origin') || '';
  const referer = request.headers.get('Referer') || '';
  return origin.includes('brysontang.com') || referer.includes('brysontang.com');
}

/**
 * Add a new guestbook entry with rate limiting and honeypot protection.
 * The site's JS posts JSON; with JS off, the same form posts form-encoded
 * and gets redirected back to the guestbook page.
 */
async function postGuestbookEntry(request, env, corsHeaders) {
  const contentType = request.headers.get('Content-Type') || '';
  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    return await postGuestbookForm(request, env);
  }

  const json = (data, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  if (!isFromSite(request)) {
    return json({ error: 'Invalid origin' }, 403);
  }

  // Parse request body
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { name, message, website } = body;

  // Honeypot check - 'website' field should be empty (hidden from humans)
  // Bots typically fill all fields, so if this has a value, silently "succeed"
  if (website) {
    return json({ success: true });
  }

  const result = await createEntry(request, env, name, message);
  if (!result.entry) {
    return json(
      { error: result.error, ...(result.status === 429 && { retryAfter: '1 hour' }) },
      result.status
    );
  }
  return json({ success: true, entry: result.entry });
}

/**
 * No-JS form submission: store the entry, then send the visitor back to the
 * guestbook with ?signed=1 or ?error=<code> for the page to render
 */
async function postGuestbookForm(request, env) {
  const back = (query) => Response.redirect(`${GUESTBOOK_PAGE}?${query}#guestbook-status`, 303);

  if (!isFromSite(request)) {
    return back('error=origin');
  }

  const form = await request.formData();

  // Honeypot: pretend success, store nothing
  if (form.get('website')) {
    return back('signed=1');
  }

  const result = await createEntry(request, env, form.get('name'), form.get('message'));
  return back(result.entry ? 'signed=1' : `error=${result.code}`);
}

/**
 * Sign via a plain GET URL, for AI agents whose only tool is a URL fetcher
 * (no POST, no MCP). No origin check: those agents send neither header.
 * Answers in plain text so whatever fetched it can read the result.
 */
async function signGuestbookViaUrl(request, url, env, corsHeaders) {
  const text = (body, status = 200) =>
    new Response(body, {
      status,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff', // the body echoes visitor input
        'Cache-Control': 'no-store',
      },
    });

  const name = url.searchParams.get('name');
  const message = url.searchParams.get('message');

  // Bare visit: explain how to use it
  if (!name && !message) {
    return text(SIGN_INSTRUCTIONS);
  }

  // The template fetched as-is (often by agents that may only open URLs they've seen):
  // explain instead of storing a "<your-name>" entry
  if (isPlaceholder(name) || isPlaceholder(message)) {
    return text(
      `Not signed: that URL still has the template placeholders in it.\n\n${SIGN_INSTRUCTIONS}`
    );
  }

  const result = await createEntry(request, env, name, message);
  if (!result.entry) {
    return text(`Not signed: ${result.error}.\n\nUsage: ${SIGN_USAGE}\n`, result.status);
  }

  return text(
    `Signed. Thank you, ${result.entry.name}.\n\n` +
      `"${result.entry.message}"\n\n` +
      `Your entry is live at ${GUESTBOOK_PAGE}\n`
  );
}

/**
 * Validate, rate limit, and store one entry. Shared by every signing path.
 * Returns { entry } on success, or { status, error, code } on failure.
 */
async function createEntry(request, env, name, message) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ipHash = await hashIP(ip, env.IP_SALT || 'default-salt');

  // Rate limit: 1 post per hour per IP
  const rateLimitKey = `guestbook_rate_${ipHash}`;
  if (await env.SITE_KV.get(rateLimitKey)) {
    return { status: 429, error: 'Please wait before posting again', code: 'rate' };
  }

  // Validation
  if (typeof name !== 'string' || typeof message !== 'string' || !name || !message) {
    return { status: 400, error: 'Name and message are required', code: 'missing' };
  }

  if (name.length > 50) {
    return { status: 400, error: 'Name too long (max 50 characters)', code: 'name' };
  }

  if (message.length > 500) {
    return { status: 400, error: 'Message too long (max 500 characters)', code: 'message' };
  }

  // Sanitize inputs (basic - the frontend should also escape on display)
  const entry = {
    name: name.trim().slice(0, 50),
    message: message.trim().slice(0, 500),
    created_at: new Date().toISOString(),
  };

  await env.brysontang_guestbook
    .prepare(
      `
    INSERT INTO guestbook (name, message, ip_hash, created_at)
    VALUES (?, ?, ?, ?)
  `
    )
    .bind(entry.name, entry.message, ipHash, entry.created_at)
    .run();

  // Set rate limit (1 hour TTL)
  await env.SITE_KV.put(rateLimitKey, '1', { expirationTtl: 3600 });

  return { entry };
}

/**
 * Hash IP address for privacy-preserving rate limiting
 */
async function hashIP(ip, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16);
}
