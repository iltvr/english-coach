import axios from 'axios';
import { sendTelegramNotification } from '../services/telegram-service';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Telegram Service', () => {
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

  test('successfully sends notification to Telegram', async () => {
    // Mock environment variables
    process.env.VITE_TELEGRAM_BOT_TOKEN = 'test-bot-token';
    process.env.VITE_TELEGRAM_CHANNEL_ID = 'test-channel-id';

    // Mock successful response
    mockedAxios.post.mockResolvedValueOnce({ status: 200, data: { ok: true } });

    await sendTelegramNotification(mockData);

    // Check if axios was called with correct parameters
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post.mock.calls[0][0]).toContain('bot' + process.env.VITE_TELEGRAM_BOT_TOKEN);

    // Check data
    const sentData = mockedAxios.post.mock.calls[0][1];
    expect(sentData).toHaveProperty('chat_id', 'test-channel-id');
    expect(sentData).toHaveProperty('parse_mode', 'HTML');
    expect(sentData.text).toContain('John Doe');
    expect(sentData.text).toContain('john@example.com');
  });

  test('handles errors when sending notification', async () => {
    // Mock environment variables
    process.env.VITE_TELEGRAM_BOT_TOKEN = 'test-bot-token';
    process.env.VITE_TELEGRAM_CHANNEL_ID = 'test-channel-id';

    // Mock error response
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

    await expect(sendTelegramNotification(mockData)).rejects.toThrow('Failed to send notification');
  });

  test('skips API call when no bot token or channel ID is provided', async () => {
    // Clear environment variables
    delete process.env.VITE_TELEGRAM_BOT_TOKEN;
    delete process.env.VITE_TELEGRAM_CHANNEL_ID;

    await sendTelegramNotification(mockData);

    // Check that axios was not called
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });
});
