import readline from 'node:readline'

import {Framework} from '.'

/**
 * Registers a callback for all kinds of application shutdown events.
 *
 * @remarks
 * Intended to be called in the constructor.
 *
 * @param app - The Framework instance
 * @returns void
 *
 * @public
 */
export const initialize = (app: Framework) => {
  const keypressListener = (_chunk, key) => {
    key?.name == 'q' && app.close(process.exit)
  }

  const exit = (code: number) => {
    process.exitCode = code
    process.exit(process.exitCode)
  }

  const makeHandle = (code: number) => msg => {
    process.exitCode = code
    code === 0 && app.logger.instance.info(msg)

    if (code !== 0) {
      typeof msg == 'string'
        ? app.logger.instance.error(msg)
        : Array.isArray(msg)
        ? msg.map(app.logger.instance.error)
        : Object.entries(msg).map(app.logger.instance.error)
    }

    setTimeout(() => exit(code), 500).unref()
  }

  const beforeExit = () => {
    process.stdin.removeAllListeners()
  }

  process.exitCode = 0
  process
    .on('beforeExit', beforeExit)
    .on('SIGTERM', makeHandle(0))
    .on('SIGINT', makeHandle(0))
    .on('uncaughtException', makeHandle(1))
    .on('unhandledRejection', makeHandle(1))

  readline.emitKeypressEvents(process.stdin)

  process.stdin.isTTY &&
    !process.env.JEST_WORKER_ID &&
    !process.env.CI &&
    process.stdin.setRawMode(true).on('keypress', keypressListener)
}
