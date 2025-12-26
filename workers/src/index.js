/**
 * Cloudflare Worker for brysontang.dev
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
        return await handleCounter(env, corsHeaders);
      }

      // --- GET GUESTBOOK ENTRIES ---
      if (url.pathname === '/api/guestbook' && request.method === 'GET') {
        return await getGuestbookEntries(env, corsHeaders);
      }

      // --- POST GUESTBOOK ENTRY ---
      if (url.pathname === '/api/guestbook' && request.method === 'POST') {
        return await postGuestbookEntry(request, env, corsHeaders);
      }

      return new Response('Not found', { status: 404, headers: corsHeaders });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};

/**
 * Increment and return visitor count
 */
async function handleCounter(env, corsHeaders) {
  const currentCount = parseInt(await env.SITE_KV.get('visitor_count') || '18538');
  const newCount = currentCount + 1;
  await env.SITE_KV.put('visitor_count', newCount.toString());

  // Pad to 6 digits for that retro counter aesthetic
  const paddedCount = newCount.toString().padStart(6, '0');

  return new Response(JSON.stringify({ count: newCount, display: paddedCount }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

/**
 * Fetch recent guestbook entries
 */
async function getGuestbookEntries(env, corsHeaders) {
  const { results } = await env.DB.prepare(`
    SELECT name, message, created_at
    FROM guestbook
    ORDER BY created_at DESC
    LIMIT 50
  `).all();

  return new Response(JSON.stringify(results), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

/**
 * Add a new guestbook entry with rate limiting and honeypot protection
 */
async function postGuestbookEntry(request, env, corsHeaders) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

  // Rate limit: 1 post per hour per IP
  const rateLimitKey = `guestbook_rate_${await hashIP(ip, env.IP_SALT || 'default-salt')}`;
  const lastPost = await env.SITE_KV.get(rateLimitKey);

  if (lastPost) {
    return new Response(JSON.stringify({
      error: 'Please wait before posting again',
      retryAfter: '1 hour'
    }), {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Parse request body
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const { name, message, website } = body;

  // Honeypot check - 'website' field should be empty (hidden from humans)
  // Bots typically fill all fields, so if this has a value, silently "succeed"
  if (website) {
    // Pretend success but don't store - bot detected
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Validation
  if (!name || !message) {
    return new Response(JSON.stringify({ error: 'Name and message are required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  if (name.length > 50) {
    return new Response(JSON.stringify({ error: 'Name too long (max 50 characters)' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  if (message.length > 500) {
    return new Response(JSON.stringify({ error: 'Message too long (max 500 characters)' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Sanitize inputs (basic - the frontend should also escape on display)
  const sanitizedName = name.trim().slice(0, 50);
  const sanitizedMessage = message.trim().slice(0, 500);

  // Store entry
  const ipHash = await hashIP(ip, env.IP_SALT || 'default-salt');
  const createdAt = new Date().toISOString();

  await env.DB.prepare(`
    INSERT INTO guestbook (name, message, ip_hash, created_at)
    VALUES (?, ?, ?, ?)
  `).bind(sanitizedName, sanitizedMessage, ipHash, createdAt).run();

  // Set rate limit (1 hour TTL)
  await env.SITE_KV.put(rateLimitKey, '1', { expirationTtl: 3600 });

  return new Response(JSON.stringify({
    success: true,
    entry: {
      name: sanitizedName,
      message: sanitizedMessage,
      created_at: createdAt
    }
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

/**
 * Hash IP address for privacy-preserving rate limiting
 */
async function hashIP(ip, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
}
