import {jest} from '@jest/globals'

const mock = jest.fn().mockImplementation(async () => {
  const mock = {
    logger: {
      log: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
    stats: jest.fn(),
  }

  return mock
})

export default mock
