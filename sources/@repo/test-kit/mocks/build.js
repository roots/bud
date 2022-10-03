import {jest} from '@jest/globals'

const mock = jest.fn().mockImplementation(async () => {
  const mock = {
    logger: {
      log: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
    config: {},
    label: `build`,
    loaders: {},
    items: {},
    rules: {},
    make: jest.fn(() => ({
      entry: {
        app: [`index.js`],
      },
    })),
    setRule: jest.fn(),
    setLoader: jest.fn(),
    setItem: jest.fn(),
  }

  mock.rules.js = {
    setUse: jest.fn(),
  }

  mock.setLoader = jest.fn(() => mock)
  mock.setItem = jest.fn(() => mock)
  mock.setRule = jest.fn(() => mock)

  return mock
})

export default mock
