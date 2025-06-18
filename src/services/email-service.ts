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
}

const EMAIL_API_ENDPOINT = import.meta.env.VITE_EMAIL_API_ENDPOINT || '';
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';

/**
 * Sends an email notification with the application data
 * 
 * @param data - The application form data to send in the email
 * @returns A promise that resolves when the email is successfully sent
 * @throws Error if the email fails to send
 */
export const sendEmailNotification = async (data: ApplicationData): Promise<void> => {
  if (!EMAIL_API_ENDPOINT || !ADMIN_EMAIL) {
    console.log('Demo mode: Email notification skipped - no API endpoint or admin email provided');
    return Promise.resolve();
  }
  
  try {
    const emailContent = formatEmailContent(data);
    
    const response = await axios.post(EMAIL_API_ENDPOINT, {
      to: ADMIN_EMAIL,
      subject: 'New English Learning Application',
      html: emailContent
    }, {
      timeout: 5000 // 5 second timeout
    });
    
    if (response.status !== 200) {
      throw new Error(`Failed to send email notification: ${response.statusText}`);
    }
    
    console.log('Email notification sent successfully');
    return Promise.resolve();
  } catch (error) {
    console.error('Email notification error:', error);
    throw new Error('Failed to send email notification');
  }
};

/**
 * Formats the application data into a readable HTML email content
 * 
 * @param data - The application form data to format
 * @returns A formatted HTML string for the email content
 */
const formatEmailContent = (data: ApplicationData): string => {
  return `
    <h1>New English Learning Application</h1>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Contact:</strong> ${data.contact}</p>
    <p><strong>Preferred Time:</strong> ${data.timeSlot}</p>
    <h2>Purpose:</h2>
    <p>${data.purpose}</p>
    <p><strong>Goal Timeframe:</strong> ${data.timeframe}</p>
    <p><strong>Weekly Study Time:</strong> ${data.weeklyTime}</p>
    <h2>Previous Experience:</h2>
    <p>${data.experience}</p>
    <p><em>Submitted: ${new Date().toLocaleString()}</em></p>
  `;
};