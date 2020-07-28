import type {Bud} from './../types'

const setProcess = (bud: Bud) => {
  process.title = 'bud-cli'
  process.env.BABEL_ENV = bud.mode
  process.env.NODE_ENV = bud.mode
  process.on('unhandledRejection', error => {
    process.exitCode = 1
    process.nextTick(() => {
      bud.hooks.call('compile_error', {bud, error})
      bud.util.terminate(bud)
    })
  })
}

export {setProcess}
