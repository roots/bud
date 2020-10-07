import Bud from '../../Bud'
import * as Webpack from 'webpack'

export {Extension}

/**
 * Extension interface
 *
 * @export
 * @interface Extension
 */
declare interface Extension {
  /**
   * Framework
   */
  bud: Bud

  /**
   * Plugin options.
   */
  options?: Extension.Options

  /**
   * Primary action of plugin.
   */
  make: () => Extension.Product

  /**
   * Whether or not to call `make`.
   */
  when?: Extension.Conditional
}

/**
 * Extension
 *
 * @namespace {Extension}
 */
declare namespace Extension {
  /**
   * Plugin options
   */
  export interface Options {
    [key: string]: any
  }

  /**
   * Function which returns a Plugin
   */
  export type Factory = (bud: Bud) => Extension

  /**
   * Possible extension products
   */
  export type Product = Webpack.Plugin | void

  /**
   * Plugin conditional
   */
  export type Conditional = () => boolean
}
