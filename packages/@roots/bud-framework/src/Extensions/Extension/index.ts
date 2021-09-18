import {Loose, Modules, Plugins} from '../..'
import {CompilerPlugin} from './CompilerPlugin'
import Controller from './Controller'
import Module from './Module'

/**
 * Registered extension names
 *
 * @remarks
 * Extension names can be declared by overloading
 * the {@link Modules} and {@link Plugins} interfaces
 *
 * @public
 */
export type Name = `${
  | (keyof Modules & string)
  | (keyof Plugins & string)}`

/**
 * Generic extension module
 *
 * @typeParam P - {@link ApplyPlugin}
 * @typeParam O - Extension options
 *
 * @public
 */
export type Extension<P = ApplyPlugin, O = unknown> =
  | Module<O>
  | CompilerPlugin<P, O>

/**
 * Apply plugin interface
 *
 * @remarks
 * Compatible with Webpack's plugin interface
 *
 * @public
 */
export interface ApplyPlugin extends Loose {
  apply(...args: any[]): unknown
}

export {CompilerPlugin, Controller, Module}
