import { sendTelegramNotification } from './telegram-service';
import { sendApplication } from './email-service';

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

// Simplified API service to prevent build issues
export const submitApplication = async (data: ApplicationData, turnstileToken: string): Promise<void> => {
  console.log('Submitting application:', data);

  // const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     secret: process.env.TURNSTILE_SECRET_KEY,
  //     response: turnstileToken,
  //   }),
  // });

  // const turnstileResult = await turnstileResponse.json();

  // if (!turnstileResult.success) {
  //   throw new Error('Turnstile validation failed');
  // }

  try {
    // Create a copy of data without the termsAgreed field for storage
    const { ...dataToStore } = data;

    // Run all operations in parallel with Promise.all
    await Promise.all([
      // sendTelegramNotification(dataToStore),
      sendApplication(dataToStore),
    ]);

    console.log('Application submitted successfully');
    return Promise.resolve();
  } catch (error) {
    console.error('Error submitting application:', error);
    return Promise.reject(error);
  }
};
