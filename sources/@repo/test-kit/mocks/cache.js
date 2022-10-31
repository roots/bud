import {vi} from 'vitest'

const mock = vi.fn().mockImplementation(async () => {
  const mock = {
    logger: {
      log: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    },
    enabled: true,
    type: `filesystem`,
  }

  return mock
})

export default mock
