import { sendApplication } from "../services/email-service";

describe("Email Service (using fetch)", () => {
  const mockData = {
    name: "John Doe",
    email: "john@example.com",
    contact: "+1234567890",
    timeSlot: "8:00 - 12:00",
    purpose: "Business English",
    weeklyTime: "3-5",
    experience: "Intermediate level",
    termsAgreed: true,
  };

  const globalAny: any = global;

  beforeEach(() => {
    jest.clearAllMocks();
    globalAny.fetch = jest.fn();
    process.env.VITE_API_BASE_URL = "/api";
  });

  afterEach(() => {
    delete process.env.VITE_API_BASE_URL;
  });

  test("successfully sends application", async () => {
    globalAny.fetch.mockResolvedValueOnce({ ok: true });

    await sendApplication(mockData);

    expect(globalAny.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = globalAny.fetch.mock.calls[0];
    expect(url).toBe("/api/send");
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(options.body)).toMatchObject(mockData);
  });

  test("throws on non-ok response", async () => {
    globalAny.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "Server error",
    });

    await expect(sendApplication(mockData)).rejects.toThrow("API 500: Server error");
  });

  test("skips fetch when VITE_API_BASE_URL is not set", async () => {
    delete process.env.VITE_API_BASE_URL;

    await sendApplication(mockData);

    expect(globalAny.fetch).not.toHaveBeenCalled();
  });
});
