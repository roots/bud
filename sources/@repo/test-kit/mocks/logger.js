import {vi} from 'vitest'

const logger = {
  instance: {
    scope: vi.fn(),
  },
  log: vi.fn(),
  info: vi.fn(),
  scope: [],
  warn: vi.fn(),
  error: vi.fn(),
}

logger.instance.scope = vi.fn(() => logger)

logger.log = vi.fn(() => logger)
logger.instance.log = logger.log
logger.info = vi.fn(() => logger)
logger.instance.info = logger.info
logger.warn = vi.fn(() => logger)
logger.instance.warn = logger.warn
logger.error = vi.fn(() => logger)
logger.instance.error = logger.error
logger.fatal = vi.fn(() => logger)
logger.instance.fatal = logger.fatal

export default logger
export const {instance, log, info, scope, warn, error} = logger
