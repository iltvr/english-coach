/**
 * email-service.ts
 *
 * Encapsulates the API call for sending form data.
 * Uses Vite env for backend URL and API key auth,
 * with fallback to process.env (for Jest).
 */

interface ApplicationData {
  name: string;
  email: string;
  contact: string;
  timeSlot: string;
  purpose: string;
  timeframe: string;
  weeklyTime: string;
  experience: string;
  termsAgreed: boolean;
  ipAddress?: string;
  browserInfo?: string;
  timeZone?: string;
  submissionTime?: string;
}

// Must be defined in your .env and injected by Vite
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '')
const API_KEY     = import.meta.env.VITE_API_KEY

if (!BACKEND_URL) {
  throw new Error('[email-service] VITE_BACKEND_URL is not defined')
}
if (!API_KEY) {
  throw new Error('[email-service] VITE_API_KEY is not defined')
}

/**
 * sendApplication
 * POSTs data to `${BACKEND_URL}/api/send`
 * - CORS mode is explicitly set.
 * - Throws on non‑2xx.
 */
export async function sendApplication(data: ApplicationData): Promise<void> {
  const url = `${BACKEND_URL.replace(/\/$/, '')}/api/send`;

  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
}
