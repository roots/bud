import {EventEmitter} from 'events'
import {
  ensureFileSync,
  readFileSync,
  writeFileSync,
} from 'fs-extra'

const handleMalfeasances = (err: Error) => {
  ensureFileSync('./jest.error.log')
  const error = err.stack || err

  writeFileSync(
    './jest.error.log',
    readFileSync('./jest.error.log', 'utf8').concat(
      error.toString(),
    ),
  )
}

global.console.log = jest.fn()
global.console.info = jest.fn()
global.console.warn = jest.fn()
process.stdout.write = jest.fn()
process.stderr.write = jest.fn()

process.on('unhandledRejection', handleMalfeasances)
process.on('uncaughtException', handleMalfeasances)

EventEmitter.defaultMaxListeners = Infinity

export {}
