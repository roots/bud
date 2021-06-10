import {error} from './tests/util/logger'

process.on('uncaughtException', err => {
  error(err)
})

global.console = Object.keys(global.console).reduce(
  (a, name) => ({
    ...a,
    [name]: jest.fn(),
  }),
  global.console,
)
