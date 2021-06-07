import {
  Bud,
  Framework,
  config as defaultConfig,
  services,
} from '@roots/bud'
import {Signale} from 'signale'

const logger = new Signale({
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
const {log, error, success} = logger

/**
 * On the annoying failure to link asm message...
 *
 * https://github.com/blitz-js/blitz/issues/1682
 * https://github.com/vadimdemedes/yoga-layout-prebuilt/issues/8
 * https://github.com/diegomura/react-pdf/issues/603
 */

const config = {...defaultConfig}

const setupBud = (
  modeOverride?: 'development' | 'production',
  configOverride?: any,
  servicesOverride?: any,
) => {
  let bud: Framework = new Bud(configOverride ?? config)
  bud.mode = modeOverride ?? 'production'

  bud.bootstrap(servicesOverride ?? services)
  bud.lifecycle()

  return bud
}

const teardownBud = (bud: Framework) => {
  bud?.server?.watcher?.close()
  bud?.dashboard?.instance?.unmount()
  bud = null

  return bud
}

const checkState = <T = any>(state: T) => {
  if (state) error('bud state persisted between tests', state)
}

export {
  Bud,
  Framework,
  setupBud,
  teardownBud,
  config,
  log,
  error,
  success,
  checkState,
}
