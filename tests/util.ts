import {
  Bud,
  Framework,
  config as defaultConfig,
  services,
} from '@roots/bud'

/**
 * On the annoying failure to link asm message...
 *
 * https://github.com/blitz-js/blitz/issues/1682
 * https://github.com/vadimdemedes/yoga-layout-prebuilt/issues/8
 * https://github.com/diegomura/react-pdf/issues/603
 */

const config = {...defaultConfig}

const setupBud = (
  mode: 'development' | 'production' = 'production',
) => {
  const bud = new Bud(config)
  bud.mode = mode

  bud.bootstrap(services)
  bud.lifecycle()

  return bud
}

const teardownBud = (bud: Framework) => {
  bud.server?.watcher?.close()
  bud.dashboard?.instance?.unmount()
  bud = null

  return bud
}

export {Bud, Framework, setupBud, teardownBud, config}
