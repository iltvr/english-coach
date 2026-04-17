class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = MockIntersectionObserver;

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = MockResizeObserver;

global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: async () => ({ ip: '1.2.3.4' }) }));
