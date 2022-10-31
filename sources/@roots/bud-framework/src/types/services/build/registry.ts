import type {Base} from './base'
import type {Item} from './item'
import type {Loader} from './loader'
import type * as Rule from './rule'

/**
 * Registered {@link Loader} loaders
 *
 * @virtual @public
 */
export interface Loaders {
  _: any
}

/**
 * Registered {@link Item} instances
 *
 * @virtual @public
 */
export interface Items {
  _: any
}

/**
 * Registered {@link Rule} instances
 *
 * @virtual @public
 */
export interface Rules {
  _: any
}

/**
 * Base interface for Loaders, Items, and Rules
 *
 * @public
 */
export type {Base}
