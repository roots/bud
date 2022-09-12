import type {Base} from './base'
import type {Item} from './item'
import type {Loader} from './loader'
import type * as Rule from './rule'

/**
 * Registered {@link Loader} instances
 *
 * @virtual @public
 */
export interface Loaders extends Record<string, Loader> {}

/**
 * Registered {@link Item} instances
 *
 * @virtual @public
 */
export interface Items extends Record<string, Item> {}

/**
 * Registered {@link Rule} instances
 *
 * @virtual @public
 */
export interface Rules extends Record<string, Rule.Interface> {}

export type {Base}
