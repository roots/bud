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
  bud?: Framework.IBud

  /**
   * Plugin options.
   */
  options?: Extension.Options

  /**
   * Primary action of plugin.
   */
  make?: Extension.Make

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
  export type Options =
    | ((bud?: Framework.IBud) => void)
    | {[key: string]: any}

  /**
   * Function which returns a Plugin
   */
  export type Factory =
    | ((bud?: Framework.IBud) => Framework.Extension)
    | Framework.Extension

  /**
   * Possible extension products
   */
  export type Product = Webpack.Plugin | void

  /**
   * Plugin make
   */
  export type Make =
    | ((options: Extension.Options) => Extension.Product)
    | Extension.Product

  /**
   * Plugin conditional
   */
  export type Conditional =
    | ((bud?: Framework.IBud) => boolean)
    | boolean
}
