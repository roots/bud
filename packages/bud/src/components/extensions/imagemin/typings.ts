import ImageMin from 'imagemin'
import type {Extension, Bud} from '@roots/bud-typings'

/**
 * Plugin class.
 */
export type Plugin = ImageMin.Plugin

/**
 * Plugin options.
 */
export type Options = {
  minimizerOptions: Options.MinimizerOptions
}

export namespace Options {
  /**
   * minimizeroptions.plugins
   */
  export type Plugins = Array<[string, {[key: string]: any}]>

  /**
   * minimizeroptions
   */
  export type MinimizerOptions = {
    [key: string]: any

    plugins: Plugins
  }
}

/**
 * Make.
 */
export type Make = Extension.Make<
  Plugin,
  Options.MinimizerOptions
>

/**
 * Conditional.
 */
export type When = Extension.When

/**
 * Configuration API.
 */
export namespace Api {
  export type Imagemin = (
    this: Bud.Bud,
    enabled: boolean,
  ) => Bud.Bud

  export type ImageminOption = (
    this: Bud.Bud,
    key: string,
    value: any,
  ) => Bud.Bud

  export type ImageminOptions = (
    this: Bud.Bud,
    options?: Options.MinimizerOptions,
  ) => Bud.Bud

  export type ImageminPlugins = (
    this: Bud.Bud,
    plugins?: Options.Plugins,
  ) => Bud.Bud
}
