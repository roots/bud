import {fs} from '@roots/bud-support'
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

  const makeExit = (code: number) => () => {
    global.process.exitCode = code
    global.process.exit(global.process.exitCode)
  }

  const makeHandle = (code: number) => (error: Error) => {
    error && fs.removeSync(app.path('storage', 'cache'))
    global.process.stdin.removeListener('keypress', keypressListener)
    setTimeout(() => app.close(makeExit(code)), 500).unref()
  }

  global.process
    .on('beforeExit', makeHandle(0))
    .on('exit', makeHandle(0))
    .on('SIGTERM', makeHandle(0))
    .on('SIGINT', makeHandle(0))
    .on('uncaughtException', makeHandle(1))
    .on('unhandledRejection', makeHandle(1))

  readline.emitKeypressEvents(process.stdin)
  global.process.stdin.isTTY &&
    global.process.stdin.setRawMode(true).on('keypress', keypressListener)
}
