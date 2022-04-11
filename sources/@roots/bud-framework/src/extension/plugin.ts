import {Module} from './module'

/**
 * Plugin module
 * 
 * @deprecated
 * Use {@link Module} directly
 */
export type Plugin<T = any, O = any> = Module<O, T>
