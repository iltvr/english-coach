import axios from 'axios';
import { storeInYDB } from '../services/ydb-service';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('YDB Service', () => {
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

  test('successfully stores data in YDB', async () => {
    // Mock environment variables
    process.env.VITE_YDB_API_KEY = 'test-api-key';
    
    // Mock successful response
    mockedAxios.post.mockResolvedValueOnce({ status: 200, data: { success: true } });
    
    await storeInYDB(mockData);
    
    // Check if axios was called with correct parameters
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post.mock.calls[0][0]).toContain('applications');
    
    // Check headers
    const headers = mockedAxios.post.mock.calls[0][2]?.headers;
    expect(headers).toHaveProperty('Authorization', 'Api-Key test-api-key');
    expect(headers).toHaveProperty('Content-Type', 'application/json');
    
    // Check data
    const sentData = mockedAxios.post.mock.calls[0][1];
    expect(sentData).toHaveProperty('name', 'John Doe');
    expect(sentData).toHaveProperty('email', 'john@example.com');
    expect(sentData).toHaveProperty('id');
    expect(sentData).toHaveProperty('timestamp');
  });

  test('handles errors when storing data', async () => {
    // Mock environment variables
    process.env.VITE_YDB_API_KEY = 'test-api-key';
    
    // Mock error response
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));
    
    await expect(storeInYDB(mockData)).rejects.toThrow('Failed to store application data');
  });

  test('skips API call when no API key is provided', async () => {
    // Clear environment variables
    delete process.env.VITE_YDB_API_KEY;
    
    await storeInYDB(mockData);
    
    // Check that axios was not called
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });
});