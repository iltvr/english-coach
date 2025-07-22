/**
 * Cloudflare Pages Function: POST /api/send
 * - Handles CORS preflight (OPTIONS)
 * - Expects JSON application data in POST
 * - Sends email via SMTP2GO HTTP API
 */

export async function onRequest(context) {
  console.log('Request received:', context);
  const { request, env } = context;
  const origin = request.headers.get('Origin') || '';
  const allowed = [
    'https://english-coach.online',
    'https://english-coach.pages.dev',
    'http://localhost:5173'
  ];
  const acao = allowed.includes(origin) ? origin : 'null';

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': acao,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Parse JSON
  let data;
  try {
    data = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  // Basic validation
  const required = ['name','email','contact','timeSlot','purpose','timeframe','weeklyTime','experience','termsAgreed'];
  for (const key of required) {
    if (data[key] == null) {
      return new Response(`Missing field: ${key}`, { status: 400 });
    }
  }

  // Build HTML
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const html = `
    <h2>New Application</h2>
    ${Object.entries(data).map(([k,v]) =>
      `<p><strong>${esc(k)}:</strong> ${esc(v)}</p>`
    ).join('')}
  `;

  // Send via SMTP2GO HTTP API
  const payload = {
    api_key:    context.env.SMTP2GO_API_KEY,
    sender:     context.env.SMTP2GO_FROM,
    to:         [context.env.TO_EMAIL],
    subject:    `[Application] ${data.name}`,
    html_body:  html
  };

  const resp = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    const txt = await resp.text();
    return new Response(`Mail error: ${resp.status} ${txt}`, { status: 502 });
  }

  return new Response(JSON.stringify({ status: 'sent' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': acao
    }
  });
}
