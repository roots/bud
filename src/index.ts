import type {Configuration} from 'webpack'
import {Bud} from './bud/types'

export * from './bud/api/types'
export type {Hooks} from './bud/hooks/types'
export type {State} from './bud/repositories/types'
export type {Util} from './bud/util/types'

export type Mode = Configuration['mode']
export type Production = boolean

import {bootstrap} from './bud'

/**
 * ## Bud - asset management framework.
 *
 * @const {Bud} bud
 */
const bud: Bud = new bootstrap().framework

/**
 * Node process handler.
 */
bud.util.processHandler(bud)

const configs = {
  eslint: require.resolve('../preset/eslint'),
  postcss: require.resolve('../preset/postcss'),
  stylelint: require.resolve('../preset/stylelint'),
}

export {bud, configs}
