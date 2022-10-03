import {jest} from '@jest/globals'

const mock = jest.fn().mockImplementation(async () => {
  return {
    logger: {
      log: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
    label: `hooks`,
    on: jest.fn(),
    filter: jest.fn(),
    fromMap: jest.fn(),
    hasSyncHook: jest.fn(),
    hasAsyncHook: jest.fn(),
    hasEvent: jest.fn(),
    async: jest.fn(),
    filterAsync: jest.fn(),
    fromAsyncMap: jest.fn(),
    action: jest.fn(),
    fire: jest.fn(),
  }
})

export default mock
