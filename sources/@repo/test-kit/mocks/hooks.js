import {jest} from '@jest/globals'

const mock = jest.fn().mockImplementation(async () => {
  const hooks = {
    logger: {
      log: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
    label: `hooks`,
  }

  hooks.on = jest.fn()
  hooks.filter = jest.fn()
  hooks.fromMap = jest.fn()
  hooks.hasSyncHook = jest.fn(() => false)
  hooks.hasAsyncHook = jest.fn(() => false)
  hooks.hasEvent = jest.fn(() => false)
  hooks.async = jest.fn()
  hooks.filterAsync = jest.fn()
  hooks.fromAsyncMap = jest.fn()
  hooks.action = jest.fn()
  hooks.fire = jest.fn()

  return hooks
})

export default mock
