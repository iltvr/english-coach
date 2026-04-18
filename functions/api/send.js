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
  const corsHeaders = { 'Access-Control-Allow-Origin': acao };

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
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  // 2) Check env vars
  if (!env.VITE_SMTP2GO_API_KEY || !env.VITE_SMTP2GO_FROM || !env.VITE_TO_EMAIL) {
    return new Response('Server misconfiguration: missing email credentials', { status: 500, headers: corsHeaders });
  }

  // 3) Parse & validate JSON
  let data;
  try {
    data = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400, headers: corsHeaders });
  }

  const required = ['name', 'email', 'contact', 'timeSlot', 'weeklyTime'];
  for (const field of required) {
    if (data[field] == null) {
      return new Response(`Missing field: ${field}`, { status: 400, headers: corsHeaders });
    }
  }
  if (data.termsAgreed !== true) {
    return new Response('Terms must be agreed', { status: 400, headers: corsHeaders });
  }

  // 4) Send via SMTP2GO API
  let resp;
  try {
    const html = buildEmailTemplate(data);
    resp = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key:   env.VITE_SMTP2GO_API_KEY,
        sender:    env.VITE_SMTP2GO_FROM,
        to:        [env.VITE_TO_EMAIL],
        subject:   `[Application] ${data.name}`,
        html_body: html
      })
    });
  } catch (err) {
    return new Response(`Mail send failed: ${err.message}`, { status: 502, headers: corsHeaders });
  }

  if (!resp.ok) {
    const err = await resp.text();
    return new Response(`Mail error ${resp.status}: ${err}`, { status: 502, headers: corsHeaders });
  }

  return new Response(JSON.stringify({ status: 'sent' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
