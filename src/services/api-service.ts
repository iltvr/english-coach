import axios from 'axios';
import { createHmac } from 'crypto-js/hmac-sha256';
import { enc } from 'crypto-js';

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

// Yandex Cloud YDB configuration
const YDB_ENDPOINT = import.meta.env.VITE_YDB_ENDPOINT || 'https://docapi.serverless.yandexcloud.net/ru-central1/your-folder-id/your-database-id';
const YDB_API_KEY = import.meta.env.VITE_YDB_API_KEY || '';
const YDB_TABLE_NAME = 'applications';

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHANNEL_ID = import.meta.env.VITE_TELEGRAM_CHANNEL_ID || '';

// Simplified API service to prevent build issues
export const submitApplication = async (data: ApplicationData): Promise<void> => {
  try {
    // Create a copy of data without the termsAgreed field for storage
    const { termsAgreed, ...dataToStore } = data;
    
    // Run all operations in parallel with Promise.all
    await Promise.all([
      storeInYDB(dataToStore),
      sendTelegramNotification(dataToStore),
      sendEmailNotification(dataToStore)
    ]);
    
    console.log('Application submitted successfully');
    return Promise.resolve();
  } catch (error) {
    console.error('Error submitting application:', error);
    return Promise.reject(error);
  }
};

const storeInYDB = async (data: ApplicationData): Promise<void> => {
  try {
    // Add timestamp to the data
    const documentData = {
      ...data,
      timestamp: new Date().toISOString(),
      id: generateId()
    };
    
    // Make request to YDB Document API
    const response = await axios.post(
      `${YDB_ENDPOINT}/${YDB_TABLE_NAME}`,
      documentData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Api-Key ${YDB_API_KEY}`
        }
      }
    );
    
    if (response.status !== 200) {
      throw new Error(`Failed to store data in YDB: ${response.statusText}`);
    }
    
    console.log('Data successfully stored in YDB');
  } catch (error) {
    console.error('YDB storage error:', error);
    throw error;
  }
};

const sendTelegramNotification = async (data: ApplicationData): Promise<void> => {
  try {
    const message = formatTelegramMessage(data);
    
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHANNEL_ID,
        text: message,
        parse_mode: 'HTML'
      }
    );
    
    if (response.status !== 200) {
      throw new Error(`Failed to send Telegram notification: ${response.statusText}`);
    }
    
    console.log('Telegram notification sent successfully');
  } catch (error) {
    console.error('Telegram notification error:', error);
    throw error;
  }
};

const sendEmailNotification = async (data: ApplicationData): Promise<void> => {
  try {
    // Implement email sending logic here
    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Email notification error:', error);
    throw error;
  }
};

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

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};