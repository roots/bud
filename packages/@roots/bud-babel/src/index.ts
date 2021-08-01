/**
 * @module @roots/bud-babel
 */

import {Framework} from '@roots/bud-framework'

/**
 * @interface babel
 */
interface Babel {
  /**
   * babel.plugins
   */
  plugins: Babel.Registry

  /**
   * babel.presets
   */
  presets: Babel.Registry

  /**
   * babel.init
   *
   * Initialize class.
   */
  init(app: Framework): Babel

  /**
   * babel.setPlugin
   *
   * Add a babel plugin.
   *
   * @usage
   *
   * ```js
   * bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
   * ```
   */
  setPlugin(plugin: Babel.Registrable): Babel

  /**
   * babel.setPlugins
   */
  setPlugins(plugins: Array<Babel.Registrable>): Babel

  /**
   * babel.setPluginOptions
   */
  setPluginOptions(plugin: string, options: any): Babel

  /**
   * babel.setPlugin
   *
   * Add a babel plugin.
   *
   * @usage
   *
   * ```js
   * bud.babel.setPlugin(MyPlugin, {plugin: 'options'})
   * ```
   */
  setPreset(preset: Babel.Registrable): Babel

  /**
   * babel.setPresets
   */
  setPresets(
    presets: Array<Babel.NormalizedPlugin | string>,
  ): Babel

  /**
   * babel.setPresetOptions
   */
  setPresetOptions(preset: string, options: any): Babel
}

/**
 * @namespace Babel
 */
namespace Babel {
  export type Options = {
    plugins?: Plugin[]
    config?: boolean | string
  }

  export type NormalizedPlugin = [string, {[key: string]: any}]

  export type Plugin =
    | string
    | NormalizedPlugin
    | CallableFunction

  export type Registrable = string | NormalizedPlugin

  export interface Registry {
    [key: string]: [string, any]
  }
}

import * as babel from './extension'

/**
 * @exports DEFAULT_PLUGINS
 *
 * Default babel plugins
 */
const DEFAULT_PLUGINS: Array<Babel.Registrable> = [
  ['@babel/plugin-transform-runtime', {helpers: false}],
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-class-properties',
]

/**
 * @exports DEFAULT_PRESETS
 *
 * Default babel presets
 */
const DEFAULT_PRESETS: Array<Babel.Registrable> = [
  '@babel/preset-env',
]

/**
 * @exports Babel
 */
export {Babel}

/**
 * @exports DEFAULT_PLUGINS
 * @exports DEFAULT_PRESETS
 */
export {DEFAULT_PLUGINS, DEFAULT_PRESETS}

/**
 * @exports default
 * @exports babel
 */
export {babel, babel as default}

/**
 * @exports name
 * @exports api
 * @exports register
 * @exports boot
 */
export const {name, api, register, boot} = babel

/**
 * @exports Config
 */
export {Config} from './Config'
