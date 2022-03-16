import {Signale} from 'signale'

const logger = new Signale({
  interactive: false,
  types: {
    log: {
      badge: '',
      label: '',
      color: 'white',
    },
    error: {
      badge: '🚨',
      label: '',
      color: 'red',
    },
    success: {
      badge: '✔',
      label: '',
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
export const {log, error, debug, info, warn, success} = logger
