// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Babel transpiler support
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import {default as BabelExtension} from '@roots/bud-babel/extension'

interface LoaderOptions {
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

interface BabelPublicApi extends PublicExtensionApi<BabelExtension> {
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
type Plugin = CallableFunction | NormalizedPlugin | string

/**
 * Babel transpiler options
 */
type Options = {
  config?: boolean | string
  plugins?: Plugin[]
}

/**
 * Normalized babel plugin
 *
 * @remarks
 * Expressed as a tuple of `[name, options]`
 */
type NormalizedPlugin = [any, Record<string, any>]

/**
 * Registrable plugin value
 *
 * @see https://babeljs.io/docs/en/plugins#using-a-plugin
 */
type Registrable = NormalizedPlugin | string

/**
 * Plugins and presets registry interface
 */
interface Registry {
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

export default BabelExtension
export type {
  BabelPublicApi,
  LoaderOptions,
  NormalizedPlugin,
  Options,
  Plugin,
  Registrable,
  Registry,
}
