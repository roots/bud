import {vi} from 'vitest'

const mock = vi.fn().mockImplementation(async () => {
  return {
    logger: {
      log: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    },
    label: `hooks`,
    on: vi.fn(),
    filter: vi.fn(),
    fromMap: vi.fn(),
    hasSyncHook: vi.fn(),
    hasAsyncHook: vi.fn(),
    hasEvent: vi.fn(),
    async: vi.fn(),
    filterAsync: vi.fn(),
    fromAsyncMap: vi.fn(),
    action: vi.fn(),
    fire: vi.fn(),
  }
})

export default mock
