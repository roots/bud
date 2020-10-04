import Bud from '../../Bud'
import * as Webpack from 'webpack'

export interface Interface {
  /**
   * Framework
   */
  bud: Bud

  /**
   * Plugin options.
   */
  options?: Options

  /**
   * Set plugin options
   */
  setOptions?: Options

  /**
   * Merge plugin options
   */
  mergeOptions?: Options

  /**
   * Primary action of plugin.
   */
  make: () => Product

  /**
   * Whether or not to call `make`.
   */
  when?: Conditional
}

/**
 * Plugin options
 */
export interface Options {
  [key: string]: any
}

/**
 * Function which returns a Plugin
 */
export type Factory = (bud: Bud) => Interface

/**
 * Possible extension products
 */
export type Product = Webpack.Plugin | void

/**
 * Plugin conditional
 */
export type Conditional = () => boolean
