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
    // only works when there is no task running
    .on('beforeExit', makeHandler(app, 0))

    // only works when the process normally exits
    // on windows, ctrl-c will not trigger this handler
    // unless you listen on 'SIGINT'
    .on('exit', makeHandler(app, 0))

    // catch ctrl-c, so that event 'exit' always works
    .on('SIGINT', makeHandler(app, 0))

    // kill-9
    .on('SIGTERM', makeHandler(app, 0))

    // ctrl-c
    .on('SIGQUIT', makeHandler(app, 0))

    // exit with errors
    .on('uncaughtException', makeHandler(app, 1))

    // exit with errors
    .on('unhandledRejection', makeHandler(app, 1))
}

/**
 * Create an error handler
 */
function makeHandler(app: Bud, code: number) {
  const ERROR = code !== 0

  const close = () => {
    process.exitCode = code

    try {
      app.isDevelopment &&
        app.server?.connection?.instance?.removeAllListeners().unref()
    } catch (err) {
      renderError(err.message)
      process.exitCode = 3
    }

    try {
      if (app.compiler?.compilation?.running) {
        app.compiler.compilation.close(() => app.close())
      }
    } catch (err) {
      process.exitCode = 2
      process.exit()
    }
  }

  return (exitMessage: string | Error) => {
    if (!ERROR) return close()
    renderError(
      exitMessage instanceof Error ? exitMessage.message : exitMessage,
    )
    setTimeout(close, 200).unref()
  }
}

/**
 * Render error
 */
function renderError(msg: string, name?: string) {
  process.stderr.write(`\n${msg}\n`)
}
