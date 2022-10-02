import {jest} from '@jest/globals'

const logger = {
  instance: {
    scope: jest.fn(),
  },
  log: jest.fn(),
  info: jest.fn(),
  scope: [],
  warn: jest.fn(),
  error: jest.fn(),
}

logger.instance.scope = jest.fn(() => logger)

logger.log = jest.fn(() => logger)
logger.instance.log = logger.log
logger.info = jest.fn(() => logger)
logger.instance.info = logger.info
logger.warn = jest.fn(() => logger)
logger.instance.warn = logger.warn
logger.error = jest.fn(() => logger)
logger.instance.error = logger.error
logger.fatal = jest.fn(() => logger)
logger.instance.fatal = logger.fatal

export default logger
export const {instance, log, info, scope, warn, error} = logger
