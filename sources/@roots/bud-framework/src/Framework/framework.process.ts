import {prettyFormat as format} from '@roots/bud-support'
import highlight from 'cli-highlight'

import {Framework} from '.'

export const terminate = (
  app: Framework,
  options = {coredump: false, timeout: 500},
) => {
  const exit = (code: number) => () => {
    global.process.exitCode = code
    global.process.exit()
  }

  return (code, reason) => (err, promise) => {
    if (err && err instanceof Error) {
      const termLog = app.logger.scoped('node', 'terminate')
      termLog.error(
        `${highlight(
          format(app, {
            callToJSON: false,
            maxDepth: 8,
            printFunctionName: false,
            escapeString: false,
            min: false,
          }),
        )}`,
      )
      termLog.error(err.message, err.stack)
    }

    app.logger.scoped(app.name, 'node', 'terminate').info(reason)

    app.close(exit(code))

    setTimeout(exit(code), options.timeout).unref()
  }
}

export const initialize = (app: Framework) => {
  const handler = terminate(app, {coredump: true, timeout: 500})
  global.process.on('uncaughtException', handler(1, 'uncaughtException'))
  global.process.on('unhandledRejection', handler(1, 'unhandledRejection'))
  global.process.on('beforeExit', handler(0, 'beforeExit'))
  global.process.on('exit', handler(0, 'exit'))
  global.process.on('SIGTERM', handler(0, 'SIGTERM'))
  global.process.on('SIGINT', handler(0, 'SIGINT'))
}
