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
  bud?: Framework.Bud

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

  /**
   * Register Items
   */
  registerItem?:
    | ((bud: Framework.Bud) => Build.Item.Module)
    | Build.Item.Module

  /**
   * Register Options
   */
  registerOption?: (param: unknown) => any

  /**
   * Register Rules
   */
  registerRule?: (param: unknown) => any

  /**
   * Do stuff after registration
   */
  boot?: (bud: Framework.Bud) => void
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
    | ((bud?: Framework.Bud) => Framework.Index<unknown>)
    | Framework.Index<unknown>

  /**
   * Function which returns a Plugin
   */
  export type Factory =
    | ((bud?: Framework.Bud) => Framework.Extension)
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
    | ((bud?: Framework.Bud) => boolean)
    | boolean
}
