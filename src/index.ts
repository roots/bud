import {join} from 'path'
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
import {bootstrap} from './bud'

/**
 * Initialize Bud.
 */
const init = () => {

  const bud: Bud = new bootstrap().framework
  bud.hooks.init(bud)

  /**
   * Action: extensions_init
   */
  bud.hooks.on('filter_adapters_init', (extensions, bud) =>
    extensions.map(({name, extension}) => ({
      name,
      extension: bud.adapters
        .controller(bud)
        .initController({name, extension}),
    })),
  )

  /**
   * Action: extensions_build
   */
  bud.hooks.on('filter_adapters_build', extensions =>
    extensions.map(({name, extension}) => ({
      name,
      extension: extension.buildPlugin(),
    })),
  )

  /**
   * Action: extensions_yield
   */
  bud.hooks.on('filter_adapters_final', extensions =>
    extensions
      .filter(({name, extension}) => extension)
      .map(({name, extension}) => extension),
  )

  return bud
}

const bud: Bud = init()

const configs = {
  eslint: require.resolve('../preset/eslint'),
  postcss: require.resolve('../preset/postcss'),
  stylelint: require.resolve('../preset/stylelint'),
}

export {bud, configs}
