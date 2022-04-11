import {Extension} from '../extension'
import {Module} from '../extension/module'

/**
 * Registered extension modules
 *
 * @virtual @public
 */
export interface Modules
  extends Record<string, Module | Extension> {}

/**
 * @virtual @public
 */
export type Options = {
  [K in keyof Modules as `${K & string}.options`]: any
}
