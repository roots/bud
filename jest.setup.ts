import {Signale} from 'signale'

declare global {
  namespace NodeJS {
    interface Global {
      log: Signale['log']
      error: Signale['error']
      success: Signale['success']
    }
  }
}

const signale = new Signale({
  types: {
    log: {
      badge: '📝',
      label: 'log',
      color: 'white',
    },
    error: {
      badge: '🚨',
      label: 'error',
      color: 'red',
    },
    success: {
      badge: '✅',
      label: 'success',
      color: 'green',
    },
  },
})

signale.config({
  displayFilename: true,
  displayTimestamp: false,
  displayDate: false,
})

global.log = signale.log
global.error = signale.error
global.success = signale.success
