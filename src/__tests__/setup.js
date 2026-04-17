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
