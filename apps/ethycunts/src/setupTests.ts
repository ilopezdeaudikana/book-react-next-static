import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
import sampleData from './data/sample_data.json'

const mockFetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => sampleData,
})

Object.defineProperty(globalThis, 'fetch', {
  value: mockFetch,
  writable: true,
})
