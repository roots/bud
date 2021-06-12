import {Bud, config as defaultConfig, services} from '@roots/bud'
import {Framework} from '@roots/bud-framework'
import {logger, log, success, error} from './logger'

/**
 * On the annoying failure to link asm message...
 *
 * https://github.com/blitz-js/blitz/issues/1682
 * https://github.com/vadimdemedes/yoga-layout-prebuilt/issues/8
 * https://github.com/diegomura/react-pdf/issues/603
 */
const setupBud = (
  modeOverride?: 'development' | 'production',
  configOverride?: any,
  servicesOverride?: any,
) => {
  const bud: Framework = new Bud(configOverride ?? defaultConfig)
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

export {helper as integration, Assets} from './integration'

export {
  Bud,
  Framework,
  setupBud,
  teardownBud,
  defaultConfig as config,
  logger,
  log,
  error,
  success,
}
