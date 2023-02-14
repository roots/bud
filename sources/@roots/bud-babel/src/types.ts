/// <reference types="@roots/bud-build" />

import type BabelExtension from './extension.js'

export interface LoaderOptions {
  env?: Record<string, any>
  presets?: Array<[string, any?]>
  plugins?: Array<[string, any?]>
  root?: string
  cacheDirectory?: boolean | string
  cacheIdentifier?: string
  cacheCompression?: boolean
  customize?: string
}

/**
 * Babel plugin value
 *
 * @see https://babeljs.io/docs/en/plugins
 */
export type Plugin = string | NormalizedPlugin | CallableFunction

/**
 * Babel transpiler options
 */
export type Options = {
  plugins?: Plugin[]
  config?: boolean | string
}

/**
 * Normalized babel plugin
 *
 * @remarks
 * Expressed as a tuple of `[name, options]`
 */
export type NormalizedPlugin = [any, Record<string, any>]

/**
 * Registrable plugin value
 *
 * @see https://babeljs.io/docs/en/plugins#using-a-plugin
 */
export type Registrable = string | NormalizedPlugin

/**
 * Plugins and presets registry interface
 */
export interface Registry {
  [key: string]: [string, any?]
}

declare module '@roots/bud-framework' {
  interface Bud {
    babel: {
      plugins: BabelExtension[`plugins`]
      presets: BabelExtension[`presets`]
      setPlugin: BabelExtension[`setPlugin`]
      setPreset: BabelExtension[`setPreset`]
      unsetPlugin: BabelExtension[`unsetPlugin`]
      unsetPreset: BabelExtension[`unsetPreset`]
      setPlugins: BabelExtension[`setPlugins`]
      setPresets: BabelExtension[`setPresets`]
      setPluginOptions: BabelExtension[`setPluginOptions`]
      setPresetOptions: BabelExtension[`setPresetOptions`]
    }
  }

  interface Modules {
    '@roots/bud-babel': Bud[`babel`]
  }

  interface Loaders {
    babel: any
  }

  interface Items {
    babel: any
  }
}
