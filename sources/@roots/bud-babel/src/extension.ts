import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import {InputError} from '@roots/bud-support/errors'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

import type {LoaderOptions, Registry} from './types.js'

/**
 * Babel configuration
 */
@label(`@roots/bud-babel`)
@expose(`babel`)
export default class BabelExtension extends Extension {
  /**
   * Babel configuration options (if overridden by project config file)
   */
  public declare configFileOptions: Record<string, any> | undefined

  /**
   * Babel env
   */
  public env: LoaderOptions[`env`] = {
    development: {compact: false},
  }

  /**
   * Plugins registry
   */
  public plugins: Registry = {}

  /**
   * Presets registry
   */
  public presets: Registry = {}

  /**
   * Cache directory
   */
  public get cacheDirectory(): LoaderOptions[`cacheDirectory`] {
    return this.app.cache.enabled
      ? this.app.path(this.app.cache.cacheDirectory, `babel`)
      : false
  }
  /**
   * Config file accessor
   */
  public get configFile(): Record<string, any> {
    return Object.values(this.app.context.files).find(
      file =>
        file?.name?.startsWith(`.babelrc`) ||
        (file?.name?.includes(`babel.config`) && file?.module),
    )
  }
  /**
   * Get babel env value
   */
  public getEnv(): LoaderOptions[`env`] {
    return this.env
  }

  /**
   * Loader options
   *
   * @readonly
   */
  public get loaderOptions(): LoaderOptions {
    const baseOptions = {
      cacheDirectory: this.cacheDirectory,
      cacheIdentifier: `babel`,
      configFile: false,
    }

    if (this.overridenByProjectConfigFile) {
      return {
        ...baseOptions,
        ...this.configFileOptions,
      }
    }

    return {
      ...baseOptions,
      env: this.env,
      plugins: Object.values(this.plugins),
      presets: Object.values(this.presets),
      root: this.root,
      targets:
        this.app.context.files[`package.json`].module.browserslist ??
        `defaults`,
    }
  }

  /**
   * Boolean representing if project has a babel config file
   */
  public get overridenByProjectConfigFile() {
    if (!this.app.context.files) return false
    return Object.values(this.app.context.files).some(
      file =>
        file?.name?.startsWith(`.babelrc`) ||
        (file?.name?.includes(`babel.config`) && file?.module),
    )
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, hooks}: Bud) {
    const loader = await this.resolve(`babel-loader`, import.meta.url)
    if (!loader) throw new Error(`babel-loader not found`)
    hooks.on(`build.resolveLoader.alias`, (alias = {}) => ({
      ...alias,
      [`babel-loader`]: loader,
    }))

    if (this.overridenByProjectConfigFile) {
      this.logger.log(
        `Babel configuration is being overridden by project configuration file.`,
      )

      this.configFileOptions =
        this.configFile.module?.default ?? this.configFile.module

      hooks.on(`build.cache.buildDependencies`, paths => {
        if (isString(this.configFile)) {
          paths.babel = [this.configFile]
          this.logger.success(
            `babel config added to webpack build dependencies`,
          )
        }
        return paths
      })

      return
    }

    const presetEnv = await this.resolve(
      `@babel/preset-env`,
      import.meta.url,
    )
    if (presetEnv) this.setPreset(`@babel/preset-env`, presetEnv)

    const transformRuntime = await this.resolve(
      `@babel/plugin-transform-runtime`,
      import.meta.url,
    )
    if (transformRuntime)
      this.setPlugin(`@babel/plugin-transform-runtime`, [
        transformRuntime,
        {helpers: false},
      ])

    build.setLoader(`babel`, `babel-loader`).setItem(`babel`, {
      loader: `babel`,
      options: () => this.loaderOptions,
    })
    build.rules.js.setUse((items = []) => [`babel`, ...items])
  }

  /**
   * Root directory
   */
  public get root() {
    return this.app.path()
  }

  /**
   * Set babel env value
   *
   * @param env - Babel env
   * @returns this
   */
  public setEnv(env: LoaderOptions[`env`]): this {
    this.env = env
    return this
  }

  /**
   * Set a babel plugin
   */
  @bind
  public setPlugin(
    name: [any, any] | string,
    plugin?: [any, any] | string,
  ): this {
    if (this.overridenByProjectConfigFile) {
      this.logger.warn(
        `Babel configuration is being overridden by project configuration file.\n`,
        `bud.babel.setPlugin will not work as expected\n`,
        `tried to set`,
        name,
        `to`,
        plugin,
      )
    }

    if (!plugin && Array.isArray(name)) {
      this.plugins[name[0]] = name
      return this
    }

    if (!plugin && !Array.isArray(name)) {
      this.plugins[name] = [name]
      return this
    }

    if (Array.isArray(name)) {
      throw new InputError(
        `When defined without options the babel plugin name must be a string.`,
        {
          props: {
            docs: new URL(`https://bud.js.org/extensions/bud-babel`),
            thrownBy: `bud.babel.setPlugin`,
          },
        },
      )
    }

    this.plugins[name] = Array.isArray(plugin) ? plugin : [plugin]
    return this
  }

  /**
   * Set options on a babel plugin
   */
  @bind
  public setPluginOptions(plugin: string, options: any): this {
    if (this.overridenByProjectConfigFile) {
      this.logger.warn(
        `Babel configuration is being overridden by project configuration file.\n`,
        `bud.babel.setPresetOptions will not work as expected\n`,
        `tried to set options:`,
        options,
        `for`,
        plugin,
      )
    }

    this.plugins[plugin] = [this.plugins[plugin].shift(), options]
    return this
  }

  /**
   * Set babel presets
   */
  @bind
  public setPlugins(plugins: {[key: string]: [any, any] | string}): this {
    if (this.overridenByProjectConfigFile) {
      this.logger.warn(
        `Babel configuration is being overridden by project configuration file.\n`,
        `bud.babel.setPresetOptions will not work as expected\n`,
        `tried to set plugins:`,
        plugins,
      )
    }

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
   * Set a babel preset
   */
  @bind
  public setPreset(name: string, preset?: [string, any] | string): this {
    if (this.overridenByProjectConfigFile) {
      this.logger.warn(
        `Babel configuration is being overridden by project configuration file.\n`,
        `bud.babel.setPresets will not work as expected\n`,
        `tried to set`,
        name,
        `to`,
        preset,
      )
    }

    if (!preset) {
      this.presets[name] = [name]
      return this
    }

    this.presets[name] = Array.isArray(preset) ? preset : [preset]
    return this
  }

  /**
   * Set options on a babel preset
   */
  @bind
  public setPresetOptions(preset: string, options: any): this {
    if (this.overridenByProjectConfigFile) {
      this.logger.warn(
        `Babel configuration is being overridden by project configuration file.\n`,
        `bud.babel.setPresetOptions will not work as expected\n`,
        `tried to set options:`,
        options,
        `for`,
        preset,
      )
    }

    this.presets[preset] = [this.presets[preset].shift(), options]
    return this
  }

  /**
   * Set babel presets
   */
  @bind
  public setPresets(presets: {
    [key: string]: [string, any] | string
  }): this {
    if (this.overridenByProjectConfigFile) {
      this.logger.warn(
        `Babel configuration is being overridden by project configuration file.\n`,
        `bud.babel.setPresets will not work as expected\n`,
        `tried to set:`,
        presets,
      )
    }

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
   * Remove a babel plugin
   */
  @bind
  public unsetPlugin(plugin: string) {
    if (this.overridenByProjectConfigFile) {
      this.logger.warn(
        `Babel configuration is being overridden by project configuration file.\n`,
        `bud.babel.setPresetOptions will not work as expected\n`,
        `tried to unset plugin:`,
        plugin,
      )
    }

    if (!isUndefined(this.plugins[plugin]))
      this.plugins[plugin] = undefined

    return this
  }

  /**
   * Remove a babel preset
   */
  @bind
  public unsetPreset(preset: string) {
    if (this.overridenByProjectConfigFile) {
      this.logger.warn(
        `Babel configuration is being overridden by project configuration file.\n`,
        `bud.babel.unsetPreset will not work as expected\n`,
        `tried to unset:`,
        preset,
      )
    }
    if (!isUndefined(this.presets[preset]))
      this.presets[preset] = undefined

    return this
  }
}
