import {Signale} from '@roots/bud-support'

import {Framework} from '.'

const Logger = new Signale({
  scope: 'process',
})

/**
 * Node shutdown factory
 *
 * @remarks
 * Returns a curried function which accepts a sigterm code
 * and a reason to be logged for the shutdown and returns a
 * a node `process.on` event handler.
 *
 * @param app - the Framework instance
 * @param options - Termination options
 * @returns
 *
 * @public
 */
export const makeTerminator = (
  app: Framework,
  options = {timeout: 500},
) => {
  const exit = (code: number) => () => {
    global.process.exitCode = code
    global.process.exit()
  }

  return (code: number, reason: string) => (err: Error) => {
    if (err && err instanceof Error) {
      Logger.error(err.message, err.stack)
    }

    Logger.info(reason)

    setTimeout(() => app.close(exit(code)), options.timeout).unref()
  }
}

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
  const handler = makeTerminator(app, {timeout: 500})

  global.process.on('uncaughtException', handler(1, 'uncaughtException'))
  global.process.on('unhandledRejection', handler(1, 'unhandledRejection'))
  global.process.on('beforeExit', handler(0, 'beforeExit'))
  global.process.on('exit', handler(0, 'exit'))
  global.process.on('SIGTERM', handler(0, 'SIGTERM'))
  global.process.on('SIGINT', handler(0, 'SIGINT'))
}
