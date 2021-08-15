import {
  Bud,
  config,
  factory,
  Framework,
  services,
} from '@roots/bud'

import {error, log, logger, success} from './logger'

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
  return factory({
    name: 'bud',
    mode: modeOverride ?? 'production',
    config: configOverride ?? config,
    services: servicesOverride ?? services,
  })
}

const teardownBud = (bud: Framework) => {
  return null
}

export {helper as integration, Assets} from './integration'

export {
  Bud,
  Framework,
  setupBud,
  teardownBud,
  config,
  logger,
  log,
  error,
  success,
}
