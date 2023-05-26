import type {Bud} from '@roots/bud-framework'
import {Extension, type OptionsMap} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {InputError} from '@roots/bud-support/errors'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import omit from '@roots/bud-support/lodash/omit'
import type {Plugin, Processor} from 'postcss'

type Input =
  | string
  | Plugin
  | Processor
  | [string | Plugin | Processor, any?]

type InputList = Array<string | [string, any?]>
type InputRecords = Record<string, Input>

/**
 * PostCSS configuration options
 */
interface Options {
  sourceMap?: boolean
  postcssOptions?: {
    config?: boolean
    syntax?: string
    parser?: string
    plugins?: InputList
  }
  plugins: InputRecords
  order: Array<`${keyof InputRecords & string}`>
  config?: boolean
  syntax?: string
  parser?: string
}
type KeyedPostCssOptions<T = keyof Options['postcssOptions']> = {
  [K in keyof Options[`postcssOptions`] as `postcssOptions.${K &
    string}`]: Options['postcssOptions'][K]
}

type KeyedOptions = Options & KeyedPostCssOptions

/**
 * PostCSS configuration
 */
@label(`@roots/bud-postcss`)
@options<KeyedOptions>({
  postcssOptions: {},
  sourceMap: false,
  plugins: {},
  order: [],
  config: false,
  syntax: undefined,
  parser: undefined,
})
@expose(`postcss`)
export class BudPostCss extends Extension<KeyedOptions> {
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

    if (
      !context.files ||
      !Object.values(context.files).some(
        file => file?.name?.includes(`postcss`) && file?.module,
      )
    ) {
      this.setPlugin(`import`, [
        await this.resolve(`postcss-import`, import.meta.url),
      ])
        .setPlugin(`nesting`, [
          await this.resolve(`postcss-nested`, import.meta.url),
        ])
        .setPlugin(`env`, [
          await this.resolve(`postcss-preset-env`, import.meta.url).then(
            path => path.replace(`.mjs`, `.cjs`),
          ),
          {
            stage: 1,
            features: {
              'focus-within-pseudo-class': false,
            },
          },
        ])
        .use([`import`, `nesting`, `env`])
    } else {
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
    }
  }

  /**
   * `postcssOptions`
   * @readonly
   */
  public get result(): Options[`postcssOptions`] {
    const explicitOptions = this.get(`postcssOptions`)
    if (
      !isUndefined(explicitOptions) &&
      Object.keys(explicitOptions).length > 0
    ) {
      this.logger.info(`postcss explicitOptions`, explicitOptions)
      return explicitOptions
    }

    const options = Object.entries({
      ...omit(this.options, [`plugins`, `order`, `postcssOptions`]),
      plugins: this.get(`order`)
        .map(name => this.get(`plugins.${name}`))
        .filter(Boolean) as InputList,
    }).reduce((a, [k, v]) => {
      if (!isUndefined(v))
        return {
          ...a,
          [k]: v,
        }

      return a
    }, {})

    this.logger.info(`postcss options`, options)

    return options
  }

  /**
   * Get postcss options
   */
  public declare getPostcssOptions: () => Options[`postcssOptions`]

  /**
   * Set postcss options
   *
   * @remarks
   * This method will overwrite the bud.postcss API options. Use with caution!
   */
  public declare setPostcssOptions: (
    options: OptionsMap<Options>['postcssOptions'],
  ) => this

  /**
   * Use plugins
   *
   * @remarks
   * Sets the plugin order
   */
  public use(
    order: Array<string> | ((plugins: Array<string>) => Array<string>),
  ) {
    this.set(`order`, order)
    return this
  }

  /**
   * Get a plugin
   */
  @bind
  public getPlugin(name: string): [string | Plugin | Processor, any?] {
    if (this.postcssOptions?.config) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.setPlugin will not work as expected\n`,
        `tried to get:`,
        name,
      )
    }

    return this.get(`plugins.${name}`) as [
      string | Plugin | Processor,
      any?,
    ]
  }

  /**
   * Set a plugin
   */
  @bind
  public setPlugin(name: string, plugin?: Input): this {
    if (this.postcssOptions?.config) {
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

    this.set(`plugins.${name}`, plugin)
    return this
  }

  /**
   * Remove a plugin
   */
  @bind
  public unsetPlugin(name: string) {
    if (this.postcssOptions?.config) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.unsetPlugin will not work as expected\n`,
        `tried to unset:`,
        name,
      )
    }

    this.set(`plugins.${name}`, undefined)

    return this
  }

  /**
   * Get plugin options
   */
  @bind
  public getPluginOptions(name: string): Record<string, any> {
    if (this.postcssOptions?.config) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.getPluginOptions will not work as expected\n`,
        `tried to get:`,
        name,
      )
    }

    const plugin: any = this.get(`plugins.${name}`)
    if (!plugin) throw new Error(`Plugin ${name} does not exist`)
    return plugin.length && plugin.length > 1 ? plugin[1] : {}
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
    if (this.postcssOptions?.config) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.setPluginOptions will not work as expected`,
      )
    }

    const plugin = this.getPlugin(name)

    if (!plugin) {
      throw new InputError(`${name} does not exist`)
    }

    this.setPlugin(name, [
      this.getPluginPath(name),
      typeof options === `function`
        ? options(this.getPluginOptions(name))
        : options,
    ])

    return this
  }

  /**
   * Get plugin path
   */
  @bind
  public getPluginPath(name: string): string {
    if (this.postcssOptions?.config) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.getPluginPath will not work as expected`,
      )
    }

    const plugin: any = this.get(`plugins.${name}`)
    return plugin && plugin?.length ? [...plugin][0] : plugin
  }

  /**
   * Set plugin path
   */
  @bind
  public setPluginPath(name: string, path: string): this {
    if (this.postcssOptions?.config) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.setPluginPath will not work as expected`,
      )
    }

    const plugin: any = this.get(`plugins.${name}`)
    if (!plugin) throw new Error(`Plugin ${name} does not exist`)

    const hasOptions = plugin.length && plugin.length > 1
    this.set(`plugins.${name}`, hasOptions ? [path, plugin[1]] : [path])

    return this
  }

  /**
   * postcss-loader's source-map option accessor
   *
   * @example
   * ```js
   * bud.postcss.get('sourceMap')
   * bud.postcss.set('sourceMap', true)
   * ```
   */
  public declare sourceMap: Options['sourceMap']

  /**
   * Get postcss-loader's source-map option
   *
   * @example
   * ```js
   * bud.postcss.getSourceMap()
   * ```
   */
  public declare getSourceMap: () => Options['sourceMap']

  /**
   * Set postcss-loader's `sourceMap` option
   *
   * @example
   * ```js
   * bud.postcss.setSourceMap(true)
   * ```
   */
  public declare setSourceMap: (
    sourceMap: OptionsMap<Options>['sourceMap'],
  ) => this

  public declare order: Options['order']

  public declare getOrder: () => Options['order']

  public declare setOrder: (order: OptionsMap<Options>['order']) => this

  public declare config: Options['config']

  public declare getConfig: () => Options['config']

  public declare setConfig: (config: OptionsMap<Options>['config']) => this

  /**
   * `postcssOptions.syntax`
   *
   * @example
   * ```js
   * bud.postcss.get('postcssOptions.syntax')
   * bud.postcss.set('postcssOptions.syntax', 'postcss-scss')
   * ```
   */
  public declare syntax: Options[`syntax`]

  /**
   * Get `postcssOptions.syntax`
   *
   * @example
   * ```js
   * bud.postcss.get('postcssOptions.syntax')
   * ```
   */
  public declare getSyntax: () => Options[`syntax`]

  /**
   * Set `postcssOptions.syntax`
   *
   * @example
   * ```js
   * bud.postcss.set('postcssOptions.syntax', 'postcss-scss')
   * ```
   */
  public declare setSyntax: (syntax: OptionsMap<Options>[`syntax`]) => this

  /**
   * Get plugins
   */
  public declare getPlugins: () => InputRecords

  public declare setPlugins: (plugins: InputRecords) => this

  /**
   * Plugins
   */
  public declare plugins: InputRecords

  public declare postcssOptions: Options['postcssOptions']
}
