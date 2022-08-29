/* eslint-disable n/no-process-exit */
import chalk from 'chalk'
import {error, log} from 'console'
import figures from 'figures'

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
export const initialize = (app: Bud) => {
  process
    // only works when the process normally exits
    // on windows, ctrl-c will not trigger this handler
    // unless you listen on 'SIGINT'
    .on(`exit`, makeHandler(app, 0))

    // catch ctrl-c, so that event 'exit' always works
    .on(`SIGINT`, makeHandler(app, 0))

    // kill-9
    .on(`SIGTERM`, makeHandler(app, 0))

    // keyboard quit event
    .on(`SIGQUIT`, makeHandler(app, 0))

    // exit with errors
    .on(`uncaughtException`, makeHandler(app, 1))

    // exit with errors
    .on(`unhandledRejection`, makeHandler(app, 1))
}

/**
 * Create an error handler
 */
const makeHandler = (app: Bud, code: number) => {
  const logMessage = app.logger?.instance?.log ?? log
  const logError = app.logger?.instance?.error ?? error

  return () => {
    process.exitCode = code

    app.close()

    if (process.exitCode === 0) {
      logMessage(chalk.gray(`${figures.tick} process exited normally\n`))
      process.exit(process.exitCode)
    }

    logError(`${figures.cross} exiting with code ${code}\n`)
    process.exit(process.exitCode)
  }
}
