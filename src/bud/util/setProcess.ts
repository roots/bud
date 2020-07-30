import type {Bud} from './../types'

const setProcess = (bud: Bud) => {
  process.title = bud.hooks.filter('node_process_title', 'bud-cli')

  process.env.BABEL_ENV = bud.mode
  process.env.NODE_ENV = bud.mode

  const unhandledRejectionHandler = bud.hooks.filter(
    'node_unhandled_rejection_handler',
    error => {
      process.exitCode = 1
      process.nextTick(() => {
        bud.hooks.call('compile_error', {bud, error})
        bud.util.terminate(bud)
      })
    },
  )

  process.on('unhandledRejection', unhandledRejectionHandler)
}

export {setProcess}
