/* eslint-disable n/no-process-exit */
import {error} from 'console'

import type {Bud} from './bud.js'

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
    .on(`uncaughtException`, makeHandler(app, 1))
    // exit with errors
    .on(`unhandledRejection`, makeHandler(app, 1))
    // only works when the process normally exits
    // on windows, ctrl-c will not trigger this handler
    // unless you listen on 'SIGINT'
    .on(`exit`, makeHandler(app, 0))
    // only works when the process normally exits
    .on(`SIGINT`, process.exit)
}

let hasClosedApplication = false

/**
 * Create an error handler
 *
 * @public
 */
const makeHandler = (app: Bud, code: number) => () => {
  if (hasClosedApplication) return
  hasClosedApplication = true

  const logError = app.logger?.instance?.error ?? error

  if (code > 0) logError(`\nexiting with code ${code}`)

  app?.close()
}
