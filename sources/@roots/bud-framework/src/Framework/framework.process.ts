import {boxen, fs} from '@roots/bud-support'

import {Framework} from '.'

const {removeSync} = fs

/**
 * Render error
 */
const renderError = (msg: string, name?: string) => {
  global.process.stderr.write(
    boxen(`\n${msg}\n`, {
      title: name ?? 'error',
      borderStyle: 'bold',
      borderColor: 'red',
      padding: 1,
      margin: 1,
    }),
  )
}

/**
 * Create an error handler
 */
const curryHandler = function (code: number) {
  const ERROR = code !== 0

  const close = () => {
    process.stdout.write(`\n`)

    try {
      ERROR && removeSync(this.path('@storage/cache'))
    } catch (err) {}

    global.process.exitCode = code
    global.process.exit()
  }

  return (exitMessage: string | Error) => {
    const exit = () => setTimeout(close, 100).unref()

    if (!ERROR) return exit()

    if (exitMessage instanceof Error) {
      renderError(exitMessage.message, exitMessage.name)
    } else {
      renderError(`\n${exitMessage}\n`, 'error')
    }

    return exit()
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
  const makeHandler = curryHandler.bind(app)

  global.process
    // only works when there is no task running
    // because we have a server always listening port, this handler will NEVER execute
    .on('beforeExit', makeHandler(0))

    // only works when the global.process normally exits
    // on windows, ctrl-c will not trigger this handler (it is unnormal)
    // unless you listen on 'SIGINT'
    .on('exit', makeHandler(0))

    // catch ctrl-c, so that event 'exit' always works
    .on('SIGINT', makeHandler(0))

    // kill-9
    .on('SIGTERM', makeHandler(0))

    // exit with errors
    .on('uncaughtException', makeHandler(1))

    // exit with errors
    .on('unhandledRejection', makeHandler(1))
}
