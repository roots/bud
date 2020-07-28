import type {Configuration} from 'webpack'

export * from './bud/api/types'
export {Hooks} from './bud/hooks/types'
export {State} from './bud/state/types'
export {Util} from './bud/util/types'

export type Mode = Configuration['mode']
export type Production = boolean

/**
 * ## Bud - asset management framework.
 *
 * @const {Bud} bud
 */
export {bud} from './bud'
