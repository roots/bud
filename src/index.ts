import type {Configuration} from 'webpack'
import {Bud} from './bud/types'

export * from './bud/api/types'
export type {Hooks} from './bud/hooks/types'
export type {State} from './bud/state/types'
export type {Util} from './bud/util/types'

export type Mode = Configuration['mode']
export type Production = boolean

/**
 * ## Bud - asset management framework.
 *
 * @const {Bud} bud
 */
import {framework} from './bud'

/**
 * Initialize Bud.
 */
const init = () => {
  /**
   * Constructor
   */
  const bud: Bud = new framework()

  /**
   * Action: adapters_init
   */
  bud.hooks.on('filter_adapters_init', (adapters, bud) =>
    adapters.map(([name, adapter]) => [
      name,
      bud.plugins.controller(bud).initController([name, adapter]),
    ]),
  )

  /**
   * Action: adapters_build
   */
  bud.hooks.on('filter_adapters_build', adapters =>
    adapters.map(([name, adapter]) => [name, adapter.buildPlugin()]),
  )

  /**
   * Action: adapters_yield
   */
  bud.hooks.on('filter_adapters_final', adapters =>
    adapters
      .filter(([name, adapter]) => adapter)
      .map(([name, adapter]) => adapter),
  )

  return bud
}

const bud: Bud = init()
export {bud}
