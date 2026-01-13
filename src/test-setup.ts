import '@testing-library/jest-dom/vitest'

// Mock IntersectionObserver for framer-motion whileInView
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []

  constructor(
    private callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
  ) {
    // Immediately trigger callback with all observed elements as visible
    setTimeout(() => {
      const entries: IntersectionObserverEntry[] = []
      this.callback(entries, this)
    }, 0)
  }

  observe(_target: Element): void {}
  unobserve(_target: Element): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

global.IntersectionObserver = MockIntersectionObserver
