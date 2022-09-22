/* eslint-disable n/no-process-exit */
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
    .on(`uncaughtException`, makeProcessHandler(app, 1))
    // exit with errors
    .on(`unhandledRejection`, makeProcessHandler(app, 1))
    // only works when the process normally exits
    // on windows, ctrl-c will not trigger this handler
    // unless you listen on 'SIGINT'
    .on(`exit`, makeProcessHandler(app, 0))
    // only works when the process normally exits
    .on(`SIGINT`, process.exit)
    .on(`SIGTERM`, process.exit)
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

  process.exitCode = process.exitCode !== 0 ? process.exitCode : code
  process.exitCode !== 0 &&
    app.context.stderr.write(`\nexiting with code ${process.exitCode}\n`)

  app?.close()
}
