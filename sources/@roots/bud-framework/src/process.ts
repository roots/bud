import {boxen, fs} from '@roots/bud-support'

import {Bud} from './'

const {removeSync} = fs

/**
 * Render error
 */
const renderError = (msg: string, name?: string) => {
  process.stderr.write(
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
const curryHandler = function (this: Bud, code: number) {
  const ERROR = code !== 0

  const close = () => {
    const die = () => {
      process.exitCode = code
      setTimeout(process.exit, 100)
    }

    try {
      ERROR && removeSync(this.path('@storage/cache'))
      this.hooks.fire('event.app.close').then(die)
    } catch (err) {
      die()
    }
  }

  return (exitMessage: string | Error) => {
    if (!ERROR) return close()

    if (exitMessage instanceof Error) {
      renderError(exitMessage.message, exitMessage.name)
    } else {
      renderError(`\n${exitMessage}\n`, 'error')
    }

    return close()
  }
}

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
  const makeHandler = curryHandler.bind(app)

  process
    // only works when there is no task running
    // because we have a server always listening port, this handler will NEVER execute
    .on('beforeExit', makeHandler(0))

    // only works when the process normally exits
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
