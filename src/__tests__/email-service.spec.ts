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

  // Create a fetch mock on global
  const globalAny: any = global;
  beforeEach(() => {
    jest.clearAllMocks();
    globalAny.fetch = jest.fn();
  });

  test("successfully sends email notification", async () => {
    process.env.VITE_EMAIL_API_ENDPOINT = "https://api.example.com/send-email";
    process.env.VITE_ADMIN_EMAIL = "admin@example.com";

    // mock fetch resolving with a Response-like object
    globalAny.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    await sendApplication(mockData);

    expect(globalAny.fetch).toHaveBeenCalledTimes(1);

    const [url, options] = globalAny.fetch.mock.calls[0];
    expect(url).toBe(process.env.VITE_EMAIL_API_ENDPOINT);

    // verify options
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({
      "Content-Type": "application/json",
      Accept: "application/json"
    });

    const body = JSON.parse(options.body);
    expect(body).toMatchObject(mockData);
  });

  test("handles errors when sending email", async () => {
    process.env.VITE_EMAIL_API_ENDPOINT = "https://api.example.com/send-email";
    process.env.VITE_ADMIN_EMAIL = "admin@example.com";

    // mock fetch rejecting
    globalAny.fetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(sendApplication(mockData)).rejects.toThrow(
      "Failed to send email notification"
    );
  });

  test("skips API call when no endpoint or admin email is provided", async () => {
    delete process.env.VITE_EMAIL_API_ENDPOINT;
    delete process.env.VITE_ADMIN_EMAIL;

    await sendApplication(mockData);

    expect(globalAny.fetch).not.toHaveBeenCalled();
  });
});
