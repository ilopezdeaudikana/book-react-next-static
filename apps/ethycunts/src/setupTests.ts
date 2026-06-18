import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
import sampleData from './data/sample_data.json'

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const mockFetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => sampleData,
})

Object.defineProperty(globalThis, 'fetch', {
  value: mockFetch,
  writable: true,
})

Object.defineProperty(globalThis, 'ResizeObserver', {
  value: MockResizeObserver,
  writable: true,
})
