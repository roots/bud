import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import '@roots/bud'

import type BabelExtension from './extension.js'

export interface LoaderOptions {
  cacheCompression?: boolean
  cacheDirectory?: boolean | string
  cacheIdentifier?: string
  configFile?: boolean
  customize?: string
  env?: Record<string, any>
  plugins?: Array<[string, any?]>
  presets?: Array<[string, any?]>
  root?: string
  targets?: any
}

export interface BabelPublicApi
  extends PublicExtensionApi<BabelExtension> {
  plugins: BabelExtension[`plugins`]
  presets: BabelExtension[`presets`]
  setPlugin: BabelExtension[`setPlugin`]
  setPluginOptions: BabelExtension[`setPluginOptions`]
  setPlugins: BabelExtension[`setPlugins`]
  setPreset: BabelExtension[`setPreset`]
  setPresetOptions: BabelExtension[`setPresetOptions`]
  setPresets: BabelExtension[`setPresets`]
  unsetPlugin: BabelExtension[`unsetPlugin`]
  unsetPreset: BabelExtension[`unsetPreset`]
}

/**
 * Babel plugin value
 *
 * @see https://babeljs.io/docs/en/plugins
 */
export type Plugin = CallableFunction | NormalizedPlugin | string

/**
 * Babel transpiler options
 */
export type Options = {
  config?: boolean | string
  plugins?: Plugin[]
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
export type Registrable = NormalizedPlugin | string

/**
 * Plugins and presets registry interface
 */
export interface Registry {
  [key: string]: [string, any?]
}

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Babel configuration
     */
    babel: BabelPublicApi
  }

  interface Modules {
    '@roots/bud-babel': BabelExtension
  }

  interface Loaders {
    babel: any
  }

  interface Items {
    babel: any
  }
}
