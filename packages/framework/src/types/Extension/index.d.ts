import * as Webpack from 'webpack'

export as namespace Extension

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
  when?: Extension.When

  /**
   * Register
   */
  register?: (bud: Framework.Bud) => void

  /**
   * Register Items
   */
  registerLoader?: [string, Build.Loader]

  registerLoaders?: Framework.Index<Build.Loader>

  /**
   * Register Items
   */
  registerItem?:
    Build.Item.Module
  registerItems?:
    Framework.Index<Framework.Extension['registerItem']>

  registerPre?: Framework.Index<Build.Rule.Module>

  /**
   * Register Rules
   */
  registerRule?: [string, Build.Rule.Module]
  registerRules?:
    Framework.Index<Build.Rule.Module>

  /**
   * Do stuff after registration
   */
  boot?: (bud: Framework.Bud) => void

  /** @todo typings */
  api?: any
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
    | ((bud?: Framework.Bud) => Framework.Index<any>)
    | ((bud?: Framework.Bud) => Array<any>)
    | Framework.Index<any>
    | Array<any>

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
   * Plugin make when
   */
  export type When =
    | ((bud: Framework.Bud, options: Extension.Options) => boolean)
    | boolean

  /**
   * Plugin conditional
   */
  export type Conditional =
    | ((bud?: Framework.Bud) => boolean)
    | boolean
}
