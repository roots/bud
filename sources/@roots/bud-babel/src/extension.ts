import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import {isUndefined} from '@roots/bud-support/lodash-es'

import type {LoaderOptions, Registry} from './types.js'

/**
 * Babel support for `@roots/bud`
 *
 * @public
 */
@label(`@roots/bud-babel`)
@expose(`babel`)
export default class BabelExtension extends Extension {
  /**
   * Babel cache directory
   *
   * @public
   */
  public get cacheDirectory(): LoaderOptions[`cacheDirectory`] {
    return this.app.cache.enabled
      ? this.app.path(
          `@storage`,
          this.app.label,
          `cache`,
          this.app.mode,
          `babel`,
        )
      : false
  }

  /**
   * Babel env
   *
   * @public
   */
  public env: LoaderOptions[`env`] = {
    development: {compact: false},
  }
  public getEnv(): LoaderOptions[`env`] {
    return this.env
  }
  public setEnv(env: LoaderOptions[`env`]): this {
    this.env = env
    return this
  }

  /**
   * Plugins registry
   *
   * @public
   */
  public plugins: Registry = {}

  /**
   * Presets registry
   *
   * @public
   */
  public presets: Registry = {}

  /**
   * Root directory
   *
   * @public
   */
  public get root() {
    return this.app.path()
  }

  /**
   * Loader options
   *
   * @readonly
   * @public
   */
  public get loaderOptions(): LoaderOptions {
    return {
      cacheDirectory: this.cacheDirectory,
      presets: Object.values(this.presets),
      plugins: Object.values(this.plugins),
      env: this.env,
      root: this.root,
    }
  }

  /**
   * Register extension
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    const presetEnv = await this.resolve(`@babel/preset-env`)
    if (presetEnv) this.setPreset(`@babel/preset-env`, presetEnv)

    const transformRuntime = await this.resolve(
      `@babel/plugin-transform-runtime`,
    )
    if (transformRuntime)
      this.setPlugin(`@babel/plugin-transform-runtime`, [
        transformRuntime,
        {helpers: false},
      ])

    const objectRestSpread = await this.resolve(
      `@babel/plugin-proposal-object-rest-spread`,
    )
    objectRestSpread &&
      this.setPlugin(
        `@babel/plugin-proposal-object-rest-spread`,
        objectRestSpread,
      )

    const classProperties = await this.resolve(
      `@babel/plugin-proposal-class-properties`,
    )
    classProperties &&
      this.setPlugin(
        `@babel/plugin-proposal-class-properties`,
        classProperties,
      )

    const dynamicImport = await this.resolve(
      `@babel/plugin-syntax-dynamic-import`,
    )
    dynamicImport &&
      this.setPlugin(`@babel/plugin-syntax-dynamic-import`, dynamicImport)
  }

  @bind
  public async configAfter() {
    const loader = await this.resolve(`babel-loader`, import.meta.url)
    if (!loader) {
      return this.logger.error(`Babel loader not found`)
    }

    this.app.build.setLoader(`babel`, loader).setItem(`babel`, {
      loader: `babel`,
      options: () => this.loaderOptions,
    })

    this.app.build.rules.js.setUse(items => [
      this.app.build.items.babel,
      ...(items ?? []),
    ])
  }

  /**
   * Set a babel preset
   *
   * @param name - babel preset name
   * @param preset - path to the babel preset or the preset itself
   * @returns The babel configuration class
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPreset(name: string, preset?: [string, any] | string): this {
    if (!preset) {
      this.presets[name] = [name]
      return this
    }

    this.presets[name] = Array.isArray(preset) ? preset : [preset]
    return this
  }

  /**
   * Set babel presets
   *
   * @remarks
   * Completely overrides existing registry
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPresets(presets: {
    [key: string]: [string, any] | string
  }): this {
    this.presets = Object.entries(presets).reduce(
      (presets, [name, preset]) => {
        if (Array.isArray(preset)) {
          presets[name] = preset
          return presets
        }

        presets[name] = [preset]
        return presets
      },
      {},
    )

    return this
  }

  /**
   * Remove a babel preset
   *
   * @param preset - preset name
   * @returns The babel configuration class
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public unsetPreset(preset: string) {
    if (!isUndefined(this.presets[preset]))
      this.presets[preset] = undefined

    return this
  }

  /**
   * Set options on a babel preset
   *
   * @param preset - preset name
   * @param options - preset options
   * @returns The babel configuration class
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPresetOptions(preset: string, options: any): this {
    this.presets[preset] = [this.presets[preset].shift(), options]
    return this
  }

  /**
   * Set a babel plugin
   *
   * @param name - babel plugin name
   * @param plugin - path to the babel plugin or the plugin itself
   * @returns The babel configuration class
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPlugin(
    name: string | [any, any],
    plugin?: [any, any] | string,
  ): this {
    if (!plugin && Array.isArray(name)) {
      this.plugins[name[0]] = name
      return this
    }

    if (!plugin && !Array.isArray(name)) {
      this.plugins[name] = [name]
      return this
    }

    if (Array.isArray(name)) {
      throw Error(`Babel plugin name must be a string.`)
    }

    this.plugins[name] = Array.isArray(plugin) ? plugin : [plugin]
    return this
  }

  /**
   * Set babel presets
   *
   * @remarks
   * Completely overrides existingplugins  registry
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPlugins(plugins: {[key: string]: [any, any] | string}): this {
    this.plugins = Object.entries(plugins).reduce(
      (plugins, [name, plugin]) => {
        if (Array.isArray(plugin)) {
          plugins[name] = plugin
          return plugins
        }

        plugins[name] = [plugin]
        return plugins
      },
      {},
    )

    return this
  }

  /**
   * Remove a babel plugin
   *
   * @param plugin - plugin name
   * @returns The babel configuration class
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public unsetPlugin(plugin: string) {
    if (!isUndefined(this.plugins[plugin]))
      this.plugins[plugin] = undefined

    return this
  }

  /**
   * Set options on a babel plugin
   *
   * @param plugin - plugin name
   * @param options - plugin options
   * @returns The babel configuration class
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [this.plugins[plugin].shift(), options]
    return this
  }
}
