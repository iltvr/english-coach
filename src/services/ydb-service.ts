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

// Yandex Cloud YDB configuration
const YDB_ENDPOINT = import.meta.env.VITE_YDB_ENDPOINT || 'https://docapi.serverless.yandexcloud.net/ru-central1/your-folder-id/your-database-id';
const YDB_API_KEY = import.meta.env.VITE_YDB_API_KEY || '';
const YDB_TABLE_NAME = 'applications';

/**
 * Stores application data in Yandex Database (YDB)
 * 
 * @param data - The application form data to store
 * @returns A promise that resolves when the data is successfully stored
 * @throws Error if the storage operation fails
 */
export const storeInYDB = async (data: ApplicationData): Promise<void> => {
  if (!YDB_API_KEY) {
    console.log('Demo mode: YDB storage skipped - no API key provided');
    return Promise.resolve();
  }
  
  try {
    // Add timestamp and unique ID to the data
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
        },
        timeout: 5000 // 5 second timeout
      }
    );
    
    if (response.status !== 200) {
      throw new Error(`Failed to store data in YDB: ${response.statusText}`);
    }
    
    console.log('Data successfully stored in YDB');
    return Promise.resolve();
  } catch (error) {
    console.error('YDB storage error:', error);
    throw new Error('Failed to store application data');
  }
};

/**
 * Generates a unique ID for database records
 * 
 * @returns A string containing a unique identifier
 */
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};