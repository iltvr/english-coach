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

/** Read from Vite’s import.meta.env or fallback to process.env */
const BACKEND_URL =
  // @ts-ignore: import.meta may not be defined in Node/Jest
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BACKEND_URL)
    || process.env.VITE_BACKEND_URL;
const API_KEY =
  // @ts-ignore
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY)
    || process.env.VITE_API_KEY;

if (!BACKEND_URL) {
  throw new Error('VITE_BACKEND_URL is not defined');
}
if (!API_KEY) {
  throw new Error('VITE_API_KEY is not defined');
}

/**
 * sendApplication
 * Sends the form data to the backend `/api/send` endpoint.
 * Throws on non-2xx responses.
 */
export async function sendApplication(data: ApplicationData): Promise<void> {
  const url = `${BACKEND_URL.replace(/\/$/, '')}/api/send`;

  const res = await fetch(url, {
    method: 'POST',
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
