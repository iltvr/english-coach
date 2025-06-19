import axios from 'axios';
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
}

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = process.env.VITE_TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHANNEL_ID = process.env.VITE_TELEGRAM_CHANNEL_ID || '';


/**
 * Formats the application data into a readable HTML message for Telegram
 *
 * @param data - The application form data to format
 * @returns A formatted HTML string for the Telegram message
 */
const formatTelegramMessage = (data: ApplicationData): string => {
  return `
  <b>🎓 New English Learning Application!</b>

  <b>Name:</b> ${data.name}
  <b>Email:</b> ${data.email}
  <b>Contact:</b> ${data.contact}
  <b>Preferred Time:</b> ${data.timeSlot}

  <b>Purpose:</b>
  ${data.purpose}

  <b>Goal Timeframe:</b> ${data.timeframe}
  <b>Weekly Study Time:</b> ${data.weeklyTime}

  <b>Previous Experience:</b>
  ${data.experience}

  <i>Submitted: ${new Date().toLocaleString()}</i>
  `;
};

/**
 * Sends a notification to Telegram with the application details.
 * @param application The application data to send.
 */

export const sendTelegramNotification = async (data: ApplicationData): Promise<void> => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHANNEL_ID) {
    console.log('Demo mode: Telegram notification skipped - no bot token or channel ID provided');
    return Promise.resolve();
  }

  try {
    const message = formatTelegramMessage(data);

    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHANNEL_ID,
        text: message,
        parse_mode: 'HTML'
      },
      {
        timeout: 5000 // 5 second timeout
      }
    );

    if (response.status !== 200) {
      throw new Error(`Failed to send Telegram notification: ${response.statusText}`);
    }

    console.log('Telegram notification sent successfully');
    return Promise.resolve();
  } catch (error) {
    console.error('Telegram notification error:', error);
    throw new Error('Failed to send notification');
  }
};
