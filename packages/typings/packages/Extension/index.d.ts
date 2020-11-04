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
   * Plugin options.
   */
  options?: Extension.Options

  /**
   * Register a webpack plugin.
   */
  make?: Extension.Make

  /**
   * Whether or not to call `make`.
   */
  when?: Extension.When

  /**
   * Register
   */
  register?: Extension.Register

  /**
   * Register loader.
   */
  registerLoader?: [string, string]

  /**
   * Register loaders from a k,v object
   */
  registerLoaders?: Framework.Index<string>

  /**
   * Register RuleSetUseItem
   */
  registerItem?: Framework.Item.Module

  /**
   * Register set of RuleSetUseItems
   */
  registerItems?: Framework.Index<
    Framework.Extension['registerItem']
  >

  /**
   * Register outside of module.rules.oneOf
   */
  registerPre?: Framework.Index<Framework.Rule.Module>

  /**
   * Register Rules
   */
  registerRule?: [string, Framework.Rule.Module]

  /**
   * Register Rules from a K,V object
   */
  registerRules?: Framework.Index<Framework.Rule.Module>

  /**
   * Do stuff after registration
   */
  boot?: Extension.Boot

  /**
   * Register API callables
   */
  api?: Framework.Index<any>
}

/**
 * Extension
 *
 * @namespace {Extension}
 */
declare namespace Extension {
  export type Register = (bud: Framework.Bud) => void

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
    | ((
        bud: Framework.Bud,
        options: Extension.Options,
      ) => boolean)
    | boolean

  /**
   * Plugin conditional
   */
  export type Conditional =
    | ((bud?: Framework.Bud) => boolean)
    | boolean

  /**
   * Do stuff after registration
   */
  export type Boot = (bud: Framework.Bud) => void
}
