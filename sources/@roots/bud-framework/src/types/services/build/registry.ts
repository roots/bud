import type {Base} from './base'
import type {Item} from './item'
import type {Loader} from './loader'
import type {Rule} from './rule'

/**
 * Registered {@link Loader} instances
 *
 * @virtual @public
 */
export interface Loaders extends Record<string, Loader> {}
export type {Loader}

/**
 * Registered {@link Item} instances
 *
 * @virtual @public
 */
export interface Items extends Record<string, Item> {}
export type {Item}

/**
 * Registered {@link Rule} instances
 *
 * @virtual @public
 */
export interface Rules extends Record<string, Rule> {}
export type {Rule}

export type {Base}
