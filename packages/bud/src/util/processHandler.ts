import type {Bud} from '..'

const processHandler = (bud: Bud): void => {
  process.title = bud.hooks.filter('node_process_title', 'bud-cli')
  bud.logger.info(
    {name: 'process', value: process.title},
    `title set`,
  )

  process.env.BABEL_ENV = bud.mode
  bud.logger.info(
    {name: 'process', value: process.env.BABEL_ENV},
    `BABEL_ENV set`,
  )

  process.env.NODE_ENV = bud.mode
  bud.logger.info(
    {name: 'process', value: process.env.NODE_ENV},
    `NODE_ENV set`,
  )

  const unhandledRejectionHandler = bud.hooks.filter(
    'node_unhandled_rejection_handler',
    error => {
      bud.logger.error(
        {name: 'process', value: error},
        `unhandled rejection error`,
      )

      process.exitCode = 1
      process.nextTick(() => {
        bud.util.terminate()
      })
    },
  )

  process.on('unhandledRejection', unhandledRejectionHandler)
}

export {processHandler}
