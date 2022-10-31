import {vi} from 'vitest'

const mock = vi.fn().mockImplementation(async () => {
  const mock = {
    logger: {
      log: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    },
    config: {},
    label: `build`,
    loaders: {},
    items: {},
    rules: {},
    make: vi.fn(() => ({
      entry: {
        app: [`index.js`],
      },
    })),
    setRule: vi.fn(),
    setLoader: vi.fn(),
    setItem: vi.fn(),
  }

  mock.rules.js = {
    setUse: vi.fn(),
  }

  mock.setLoader = vi.fn(() => mock)
  mock.setItem = vi.fn(() => mock)
  mock.setRule = vi.fn(() => mock)

  return mock
})

export default mock
