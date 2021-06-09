import {Signale} from 'signale'

const logger = new Signale({
  interactive: true,
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

logger.config({
  displayFilename: true,
  displayTimestamp: false,
  displayDate: false,
})

export {logger}
export const {log, error, success} = logger
