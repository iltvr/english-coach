import axios from 'axios';
import { sendEmailNotification } from '../services/email-service';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Email Service', () => {
  const mockData = {
    name: 'John Doe',
    email: 'john@example.com',
    contact: '+1234567890',
    timeSlot: 'morning',
    purpose: 'Business English',
    timeframe: '3-6-months',
    weeklyTime: '3-5',
    experience: 'Intermediate level'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('successfully sends email notification', async () => {
    // Mock environment variables
    process.env.VITE_EMAIL_API_ENDPOINT = 'https://api.example.com/send-email';
    process.env.VITE_ADMIN_EMAIL = 'admin@example.com';
    
    // Mock successful response
    mockedAxios.post.mockResolvedValueOnce({ status: 200, data: { success: true } });
    
    await sendEmailNotification(mockData);
    
    // Check if axios was called with correct parameters
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post.mock.calls[0][0]).toBe(process.env.VITE_EMAIL_API_ENDPOINT);
    
    // Check data
    const sentData = mockedAxios.post.mock.calls[0][1];
    expect(sentData).toHaveProperty('to', 'admin@example.com');
    expect(sentData).toHaveProperty('subject', 'New English Learning Application');
    expect(sentData.html).toContain('John Doe');
    expect(sentData.html).toContain('john@example.com');
  });

  test('handles errors when sending email', async () => {
    // Mock environment variables
    process.env.VITE_EMAIL_API_ENDPOINT = 'https://api.example.com/send-email';
    process.env.VITE_ADMIN_EMAIL = 'admin@example.com';
    
    // Mock error response
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));
    
    await expect(sendEmailNotification(mockData)).rejects.toThrow('Failed to send email notification');
  });

  test('skips API call when no API endpoint or admin email is provided', async () => {
    // Clear environment variables
    delete process.env.VITE_EMAIL_API_ENDPOINT;
    delete process.env.VITE_ADMIN_EMAIL;
    
    await sendEmailNotification(mockData);
    
    // Check that axios was not called
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });
});