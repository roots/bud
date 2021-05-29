require('./jest.types')
const {Signale} = require('Signale')
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
  underline: false,
})

global.log = signale.log
global.error = signale.error
global.success = signale.succeess
