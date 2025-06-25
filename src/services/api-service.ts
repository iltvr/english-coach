import { sendTelegramNotification } from './telegram-service';

interface ApplicationData {
  name: string;
  email: string;
  contact: string;
  timeSlot: string;
  purpose: string;
  timeframe: string;
  weeklyTime: string;
  experience: string;
  termsAgreed?: boolean;
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
    const { termsAgreed, ...dataToStore } = data;

    // Run all operations in parallel with Promise.all
    await Promise.all([
      sendTelegramNotification(dataToStore),
      // sendEmailNotification(dataToStore)
    ]);

    console.log('Application submitted successfully');
    return Promise.resolve();
  } catch (error) {
    console.error('Error submitting application:', error);
    return Promise.reject(error);
  }
};

// const sendTelegramNotification = async (data: ApplicationData): Promise<void> => {
//   try {
//     const message = formatTelegramMessage(data);

//     const response = await axios.post(
//       `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
//       {
//         chat_id: TELEGRAM_CHANNEL_ID,
//         text: message,
//         parse_mode: 'HTML'
//       }
//     );

//     if (response.status !== 200) {
//       throw new Error(`Failed to send Telegram notification: ${response.statusText}`);
//     }

//     console.log('Telegram notification sent successfully');
//   } catch (error) {
//     console.error('Telegram notification error:', error);
//     throw error;
//   }
// };

// const sendEmailNotification = async (data: ApplicationData): Promise<void> => {
//   try {
//     // Implement email sending logic here
//     console.log('Email notification sent successfully');
//   } catch (error) {
//     console.error('Email notification error:', error);
//     throw error;
//   }
// };

// const formatTelegramMessage = (data: ApplicationData): string => {
//   return `
// <b>🎓 New English Learning Application!</b>

// <b>Name:</b> ${data.name}
// <b>Email:</b> ${data.email}
// <b>Contact:</b> ${data.contact}
// <b>Preferred Time:</b> ${data.timeSlot}

// <b>Purpose:</b>
// ${data.purpose}

// <b>Goal Timeframe:</b> ${data.timeframe}
// <b>Weekly Study Time:</b> ${data.weeklyTime}

// <b>Previous Experience:</b>
// ${data.experience}

// <i>Submitted: ${new Date().toLocaleString()}</i>
// `;
// };

// Helper function to generate a unique ID
// const generateId = (): string => {
//   return Date.now().toString(36) + Math.random().toString(36).substring(2);
// };
