import type {Bud} from '@roots/bud-framework'
import {
  Extension,
  type OptionCallbackValue,
} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import {InputError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import omit from '@roots/bud-support/lodash/omit'

import type {
  BudPostCssPublicInterface,
  Options,
  PluginInput,
  PluginReference,
} from './options.js'
import {BudPostCssOptionsApi} from './options.js'

/**
 * PostCSS configuration
 */
@label(`@roots/bud-postcss`)
@expose(`postcss`)
class BudPostCss extends BudPostCssOptionsApi {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({
    build,
    context,
    hooks,
  }: Bud): Promise<void> {
    const loader = await this.resolve(`postcss-loader`, import.meta.url)
    if (!loader) throw new Error(`postcss-loader not found`)

    hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      [`postcss-loader`]: loader,
    }))

    build
      .setLoader(
        `postcss`,
        await this.resolve(`postcss-loader`, import.meta.url),
      )
      .setItem(`postcss`, {
        loader: `postcss`,
        options: () => ({
          postcssOptions: this.result,
          sourceMap: this.get(`sourceMap`),
        }),
      })

    build.rules.css.setUse((items = []) => [...items, `postcss`])
    build.rules.cssModule?.setUse((items = []) => [...items, `postcss`])

    const usingPostCssRc =
      context.files &&
      Object.values(context.files).some(
        file => file?.name?.includes(`postcss`) && file?.module,
      )

    if (usingPostCssRc) {
      this.logger.log(
        `PostCSS configuration is being overridden by project configuration file.`,
      )
      this.setConfig(true)

      const config = Object.values(context.files).find(
        file => file?.name?.includes(`postcss`) && file?.module,
      )

      if (isString(config.path))
        hooks.on(`build.cache.buildDependencies`, paths => ({
          ...paths,
          postcss: [config.path],
        }))

      return
    }

    this.setPlugin(
      `import`,
      await this.resolve(`postcss-import`, import.meta.url),
    )
      .setPlugin(
        `nesting`,
        await this.resolve(`postcss-nested`, import.meta.url),
      )
      .setPlugin(
        `env`,
        await this.resolve(`postcss-preset-env`, import.meta.url).then(
          path => path.replace(`.mjs`, `.cjs`),
        ),
      )
      .setPluginOptions(`env`, {
        stage: 1,
        features: {
          'focus-within-pseudo-class': false,
        },
      })
      .use([`import`, `nesting`, `env`])
  }

  /**
   * `postcssOptions`
   * @readonly
   */
  public get result(): Options[`postcssOptions`] {
    const explicitOptions = this.postcssOptions
    if (
      !isUndefined(explicitOptions) &&
      Object.keys(explicitOptions).length > 0
    ) {
      this.logger.info(`postcss explicitOptions`, explicitOptions)
      return explicitOptions
    }

    const options = Object.entries({
      ...omit(this.options, [`plugins`, `order`, `postcssOptions`]),
      plugins: this.get(`order`).map(this.getPlugin).filter(Boolean),
    })
      .filter(([k, v]) => !isUndefined(v))
      .reduce((a, [k, v]) => ({...a, [k]: v}), {})

    this.logger.info(`postcss options`, options)

    return options
  }

  /**
   * Use plugins
   *
   * @remarks
   * Sets the plugin order
   */
  public use(
    order: OptionCallbackValue<BudPostCssPublicInterface, `order`>,
  ) {
    this.setOrder(order)
    return this
  }

  /**
   * Get a plugin
   */
  @bind
  public getPlugin(name: string): PluginReference {
    name = this.normalizePluginName(name)

    if (this.postcssOptions || this.config) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.setPlugin will not work as expected\n`,
        `tried to get:`,
        name,
      )
    }

    return this.plugins[name]
  }

  /**
   * Set a plugin
   */
  @bind
  public setPlugin(name: string, plugin?: PluginInput): this {
    name = this.normalizePluginName(name)

    if (this.postcssOptions || this.config) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.setPlugin will not work as expected\n`,
        `tried to set:`,
        name,
        plugin,
      )
    }

    if (isUndefined(plugin)) {
      plugin = [name, undefined]
    }

    if (!Array.isArray(plugin)) {
      plugin = [plugin, undefined]
    }

    this.plugins[name] = plugin

    return this
  }

  /**
   * Remove a plugin
   */
  @bind
  public unsetPlugin(name: string) {
    this.plugins[this.normalizePluginName(name)] = undefined

    return this
  }

  /**
   * Get plugin options
   */
  @bind
  public getPluginOptions(name: string): Record<string, any> {
    const plugin = this.getPlugin(name)
    if (!plugin) throw new Error(`Plugin ${name} does not exist`)
    return plugin[1] ?? []
  }

  /**
   * Override plugin options
   */
  @bind
  public setPluginOptions(
    name: string,
    options:
      | Record<string, any>
      | ((options: Record<string, any>) => Record<string, any>),
  ): this {
    const plugin = this.getPlugin(name)

    if (!plugin) {
      throw new InputError(`${name} does not exist`)
    }

    this.setPlugin(name, [
      plugin[0],
      isFunction(options) ? options(plugin[1]) : options,
    ])

    return this
  }

  /**
   * Get plugin path
   */
  @bind
  public getPluginPath(name: string): PluginReference[0] {
    const plugin = this.getPlugin(name)
    if (!plugin) throw new Error(`Plugin ${name} does not exist`)
    return plugin[0]
  }

  /**
   * Set plugin path
   */
  @bind
  public setPluginPath(name: string, path: PluginInput & string): this {
    const plugin = this.getPlugin(name)
    if (!plugin) throw new Error(`Plugin ${name} does not exist`)

    this.setPlugin(name, [path, plugin[1]])

    return this
  }

  @bind
  protected normalizePluginName(name: string): string {
    if (name.startsWith(`postcss-`)) name = name.replace(`postcss-`, ``)
    if (name === `nesting`) name = `nested`
    if (name === `preset-env`) name = `env`

    return name
  }
}

export {BudPostCss, type BudPostCssPublicInterface}
