/**
 * email-service.ts
 * Calls the Pages Function at /api/send
 */

export interface ApplicationData {
  name: string;
  email: string;
  contact: string;
  timeSlot: string;
  purpose: string;
  weeklyTime: string;
  experience: string;
  termsAgreed: boolean;
  ipAddress?: string;
  browserInfo?: string;
  timeZone?: string;
  submissionTime?: string;
}

const URL = process.env.VITE_API_BASE_URL || ''; // e.g. '/api'
if (!URL) throw new Error('VITE_API_BASE_URL not defined');

export async function sendApplication(data: ApplicationData) {
  const res = await fetch(`${URL}/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API ${res.status}: ${txt}`);
  }
}
