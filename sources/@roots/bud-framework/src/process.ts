/* eslint-disable n/no-process-exit */
import {isNumber} from '@roots/bud-support/lodash-es'

import type {Bud} from './bud'

/**
 * Registers a callback for all kinds of application shutdown events.
 *
 * @remarks
 * Intended to be called in the constructor.
 *
 * @param app - The Bud instance
 * @returns void
 *
 * @public
 */
export const initialize = (app: Bud): void => {
  process
    // exit with errors
    .once(`uncaughtException`, makeProcessHandler(app, 1))
    // exit with errors
    .once(`unhandledRejection`, makeProcessHandler(app, 1))

    // only works when the process normally exits
    .once(`SIGINT`, makeProcessHandler(app, 0))
    .once(`SIGTERM`, makeProcessHandler(app, 0))
    .once(`beforeExit`, makeProcessHandler(app, 0))
}

/**
 * Has the application already exited?
 *
 * @public
 */
let appExited: boolean = false

/**
 * Create an error handler
 *
 * @public
 */
const makeProcessHandler = (app: Bud, code: number) => () => {
  if (appExited) return
  appExited = true

  process.exitCode = !isNumber(code) ? process.exitCode : code

  app?.close()

  app?.logger?.instance
    ? app.logger.instance[process.exitCode === 0 ? `success` : `error`](
        `exiting with code ${process.exitCode}`,
      )
    : app.context[process.exitCode === 0 ? `stdout` : `stderr`].write(
        `\nexiting with code ${process.exitCode}\n`,
      )
}
