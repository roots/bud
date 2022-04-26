import {Signale} from 'signale'

const types = {
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
}

const logger = new Signale({
  interactive: false,
  types,
})

logger.config({
  displayFilename: true,
  displayTimestamp: false,
  displayDate: false,
})

export const make = (options?, config?) => {
  const logger = new Signale({
    types,
    interactive: true,
    ...(options ?? {}),
  })
  logger.config({
    displayFilename: false,
    displayTimestamp: false,
    displayDate: false,
    ...(config ?? {}),
  })
  return logger
}

export {logger}
export const {log, error, debug, info, warn, success} = logger
