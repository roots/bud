import type {LoaderOptions, Registry} from '@roots/bud-babel'
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

/**
 * Babel configuration
 */
@label(`@roots/bud-babel`)
@expose(`babel`)
class BabelExtension extends Extension {
  /**
   * Babel configuration options (sourced from babelrc)
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
    return this.app.cache.enabled && this.app.cache.cacheDirectory
      ? this.app.path(this.app.cache.cacheDirectory, `babel`)
      : false
  }

  /**
   * Config file accessor
   */
  public get configFile(): Record<string, any> | undefined {
    return Object.values(this.app.context.files).find(
      file =>
        file.name.includes(`babelrc`) || file.name === `babel.config`,
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
    }

    if (this.configFile) {
      return {...baseOptions, ...this.configFileOptions}
    }

    return {
      ...baseOptions,
      configFile: false,
      env: this.env,
      plugins: Object.values(this.plugins),
      presets: Object.values(this.presets),
      root: this.root,
      targets: this.app.context.manifest?.browserslist ?? {
        esmodules: true,
      },
    }
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

    if (this.configFile) {
      this.logger.log(
        `Babel configuration is being overridden by project configuration file.`,
      )

      this.configFileOptions =
        this.configFile.module?.default ?? this.configFile.module

      hooks.on(`build.cache.buildDependencies`, (paths = {}) => {
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
    name: [any, any?] | string,
    plugin?: [any, any?] | string,
  ): this {
    if (!plugin) {
      this.plugins[name[0]] = Array.isArray(name) ? name : [name]
      return this
    }

    if (Array.isArray(name)) {
      throw new InputError(`Invalid plugin name`)
    }

    this.plugins[name] = Array.isArray(plugin) ? plugin : [plugin]

    return this
  }

  /**
   * Set options on a babel plugin
   */
  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.plugins[plugin] = [this.plugins[plugin].shift(), options]
    return this
  }

  /**
   * Set babel plugins
   */
  @bind
  public setPlugins(plugins: {[key: string]: [any, any?] | string}): this {
    this.plugins = Object.entries(plugins).reduce(
      (plugins, [name, plugin]) => ({
        ...plugins,
        [name]: Array.isArray(plugin) ? plugin : [plugin],
      }),
      {},
    )

    return this
  }

  /**
   * Set a babel preset
   */
  @bind
  public setPreset(
    name: [any, any?] | string,
    preset?: [any, any?] | string,
  ): this {
    if (!preset) {
      this.presets[name[0]] = Array.isArray(name) ? name : [name]
      return this
    }

    if (Array.isArray(name)) {
      throw new InputError(`Invalid preset name`)
    }

    this.presets[name] = Array.isArray(preset) ? preset : [preset]

    return this
  }

  /**
   * Set options on a babel preset
   */
  @bind
  public setPresetOptions(preset: string, options: any): this {
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
    this.presets = Object.entries(presets).reduce(
      (presets, [name, preset]) => ({
        ...presets,
        [name]: Array.isArray(preset) ? preset : [preset],
      }),
      {},
    )

    return this
  }

  /**
   * Remove a babel plugin
   */
  @bind
  public unsetPlugin(plugin: string) {
    if (!isUndefined(this.plugins[plugin])) delete this.plugins[plugin]

    return this
  }

  /**
   * Remove a babel preset
   */
  @bind
  public unsetPreset(preset: string) {
    if (!isUndefined(this.presets[preset])) delete this.presets[preset]

    return this
  }
}

export {BabelExtension as default}
