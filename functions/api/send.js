/**
 * Cloudflare Pages Function: POST /api/send
 *
 * Expects JSON payload with application fields.
 * Sends email via SMTP2GO HTTP API.
 */
import { buildEmailTemplate } from '../../src/utils/buildEmailTemplate.js';

export async function onRequest(context) {
  const { request, env } = context;

  // 1) CORS
  const origin = request.headers.get('Origin');
  const allowed = [
    'https://english-coach.online',
    'https://english-coach.pages.dev',
    'http://localhost:5173'
  ];
  const acao = allowed.includes(origin) ? origin : 'null';

  // Preflight
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

  // 2) Parse & validate JSON
  let data;
  try {
    data = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }
  const required = ['name','email','contact','timeSlot','purpose','weeklyTime','experience','termsAgreed'];
  for (const field of required) {
    if (data[field] == null) {
      return new Response(`Missing field: ${field}`, { status: 400 });
    }
  }

  // 4) Build HTML
  const esc = s => String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/\n/g,'<br/>');

  const html = buildEmailTemplate(data);

  // 5) Send via SMTP2GO API
  const payload = {
    api_key:    env.VITE_SMTP2GO_API_KEY,
    sender:     env.VITE_SMTP2GO_FROM,
    to:         [ env.VITE_TO_EMAIL ],
    subject:    `[Application] ${data.name}`,
    html_body:  html
  };

  const resp = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    const err = await resp.text();
    return new Response(`Mail error ${resp.status}: ${err}`, { status: 502 });
  }

  return new Response(JSON.stringify({ status: 'sent' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': acao
    }
  });
}
