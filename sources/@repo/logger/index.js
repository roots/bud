import {paths} from '@repo/constants'
import Signale from 'signale'

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

export const make = (options, config) => {
  const logger = new Signale.Signale({
    types,
    interactive: true,
    ...(options ?? {}),
  })
  logger.config({
    types,
    displayFilename: false,
    displayTimestamp: false,
    displayDate: false,
    ...(config ?? {}),
    secrets: [paths.root, process.cwd()],
  })

  return logger
}

export const logger = make()
export const {log, error, debug, info, warn, success} = logger
