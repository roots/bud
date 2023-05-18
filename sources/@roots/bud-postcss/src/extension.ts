import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
import {InputError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import type {Plugin, Processor} from 'postcss'

type Input =
  | string
  | Plugin
  | Processor
  | [string | Plugin | Processor, any?]

type InputList = Array<string | [string, any?]>
type InputRecords = Record<string, Input>
type InputMap = Map<string, Input>

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
}

/**
 * PostCSS configuration
 */
@label(`@roots/bud-postcss`)
@options<Options>({
  postcssOptions: {
    config: false,
  },
})
@expose(`postcss`)
export class BudPostCss extends Extension<Options> {
  /**
   * Config file options
   */
  protected configFileOptions: Options[`postcssOptions`]

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, context}: Bud): Promise<void> {
    if (
      !context.files ||
      !Object.values(context.files).some(
        file => file?.name?.includes(`postcss`) && file?.module,
      )
    ) {
      this.set(`import`, [
        await this.resolve(`postcss-import`, import.meta.url),
      ])
        .set(`nesting`, [
          await this.resolve(`postcss-nested`, import.meta.url),
        ])
        .set(`env`, [
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
        .set(`order`, [`import`, `nesting`, `env`])
    } else {
      this.logger.log(
        `PostCSS configuration is being overridden by project configuration file.`,
      )
      this.set(`postcssOptions.config`, true)
      this.configFileOptions = Object.values(this.app.context.files).find(
        file => file?.name?.includes(`postcss`) && file?.module,
      )?.module
    }

    build
      .setLoader(
        `postcss`,
        await this.resolve(`postcss-loader`, import.meta.url),
      )
      .setItem(`postcss`, {
        loader: `postcss`,
        options: () => ({
          postcssOptions: this.configFileOptions ?? this.postcssOptions,
          sourceMap: this.get(`sourceMap`),
        }),
      })

    build.rules.css.setUse((items = []) => [...items, `postcss`])
    build.rules.cssModule?.setUse((items = []) => [...items, `postcss`])
  }

  /**
   * `postcssOptions`
   * @readonly
   */
  public get postcssOptions(): Options[`postcssOptions`] {
    const options: Options[`postcssOptions`] = this.get(
      `postcssOptions`,
    ) as Options[`postcssOptions`]

    if (!options?.plugins?.length) {
      options.plugins = this.get(`order`)
        .map(name => this.get(name))
        .filter(Boolean) as InputList
    }

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
    order: Array<string> | ((plugins: Array<string>) => Array<string>),
  ) {
    this.set(`order`, order)
    return this
  }

  /**
   * Set plugins
   */
  @bind
  public setPlugins(plugins: InputRecords | InputMap | InputList): this {
    if (this.get(`postcssOptions.config`)) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.setPlugins will not work as expected\n`,
        `tried to set:`,
        plugins,
      )
    }

    const pluginMap = (plugin: string | [string, any?]): [string, any?] =>
      Array.isArray(plugin) ? plugin : [plugin]

    if (Array.isArray(plugins)) {
      plugins.map(pluginMap).forEach(plugin => this.set(...plugin))
      return this
    }

    if (plugins instanceof Map) {
      Array.from(plugins.entries()).forEach(plugin => {
        this.set(...plugin)
      })

      return this
    }

    Object.entries(plugins)
      .map(pluginMap)
      .forEach(plugin => this.set(...plugin))

    return this
  }

  /**
   * Set a plugin
   */
  @bind
  public setPlugin(name: string, plugin?: Input): this {
    if (this.get(`postcssOptions.config`)) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.setPlugin will not work as expected\n`,
        `tried to set:`,
        name,
        plugin,
      )
    }

    if (isUndefined(plugin)) {
      this.set(name, [name])
      return this
    }

    if (Array.isArray(plugin)) {
      this.set(name, plugin)
      return this
    }

    this.set(name, [plugin])
    return this
  }

  /**
   * Remove a plugin
   */
  @bind
  public unsetPlugin(name: string) {
    if (this.get(`postcssOptions.config`)) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.unsetPlugin will not work as expected\n`,
        `tried to unset:`,
        name,
      )
    }

    this.set(name, undefined)

    return this
  }

  /**
   * Get plugin options
   */
  @bind
  public getPluginOptions(name: string): Record<string, any> {
    if (this.get(`postcssOptions.config`)) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.getPluginOptions will not work as expected\n`,
        `tried to get:`,
        name,
      )
    }

    const plugin: any = this.get(name)
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
    if (this.get(`postcssOptions.config`)) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.setPluginOptions will not work as expected`,
      )
    }

    const plugin = this.get(name)

    if (!plugin) {
      throw new InputError(`${name} does not exist`)
    }

    this.set(name, [
      this.getPluginPath(name),
      isFunction(options) ? options(this.getPluginOptions(name)) : options,
    ])

    return this
  }

  /**
   * Get plugin path
   */
  @bind
  public getPluginPath(name: string): string {
    if (this.get(`postcssOptions.config`)) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.getPluginPath will not work as expected`,
      )
    }

    const plugin: any = this.get(name)
    return plugin && plugin?.length ? [...plugin][0] : plugin
  }

  /**
   * Set plugin path
   */
  @bind
  public setPluginPath(name: string, path: string): this {
    if (this.get(`postcssOptions.config`)) {
      this.logger.warn(
        `PostCSS configuration is being overridden by project configuration file.\n`,
        `bud.postcss.setPluginPath will not work as expected`,
      )
    }

    const plugin: any = this.get(name)
    if (!plugin) throw new Error(`Plugin ${name} does not exist`)

    const hasOptions = plugin.length && plugin.length > 1
    this.set(name, hasOptions ? [path, plugin[1]] : [path])

    return this
  }

  /**
   * `postcssOptions.syntax`
   *
   * @deprecated use {@link BudPostCss.get} and {@link BudPostCss.set}
   *
   * @example
   * ```js
   * bud.postcss.get('postcssOptions.syntax')
   * bud.postcss.set('postcssOptions.syntax', 'postcss-scss')
   * ```
   */
  public get syntax() {
    return this.get(`postcssOptions.syntax`) as string
  }
  public set syntax(syntax: string) {
    this.set(`postcssOptions.syntax`, syntax)
  }

  /**
   * Get `postcssOptions.syntax`
   *
   * @deprecated use {@link BudPostCss.get}
   *
   * @example
   * ```js
   * bud.postcss.get('postcssOptions.syntax')
   * ```
   */
  @deprecated(`bud.postcss`, `Use bud.postcss.get instead`, [
    [
      `get value of postcssOptions.syntax`,
      `bud.postcss.get('postcssOptions.syntax')`,
    ],
  ])
  public getSyntax(): string {
    return this.get(`postcssOptions.syntax`) as string
  }
  /**
   * Set `postcssOptions.syntax`
   *
   * @deprecated use {@link BudPostCss.set}
   *
   * @example
   * ```js
   * bud.postcss.set('postcssOptions.syntax', 'postcss-scss')
   * ```
   */
  @deprecated(`bud.postcss`, `Use bud.postcss.set instead`, [
    [
      `set value of postcssOptions.syntax`,
      `bud.postcss.set('postcssOptions.syntax', 'postcss-scss')`,
    ],
  ])
  public setSyntax(syntax: string): this {
    this.set(`postcssOptions.syntax`, syntax)
    return this
  }

  /**
   * postcss-loader's source-map option accessor
   *
   * @deprecated use {@link BudPostCss.get} and {@link BudPostCss.set}
   *
   * @example
   * ```js
   * bud.postcss.get('sourceMap')
   * bud.postcss.set('sourceMap', true)
   * ```
   */
  public get sourceMap(): boolean {
    return this.get(`sourceMap`)
  }
  public set sourceMap(sourceMap: boolean) {
    this.set(`sourceMap`, sourceMap)
  }

  /**
   * Get postcss-loader's source-map option
   * @deprecated use {@link BudPostCss.get}
   *
   * @example
   * ```js
   * bud.postcss.get('sourceMap')
   * ```
   */
  @deprecated(`bud.postcss`, `Use bud.postcss.get instead`, [
    [`get value of sourceMap`, `bud.postcss.get('sourceMap')`],
  ])
  public getSourceMap(): boolean {
    return this.get(`sourceMap`)
  }

  /**
   * Set postcss-loader's `sourceMap` option
   * @deprecated use {@link BudPostCss.set}
   *
   * @example
   * ```js
   * bud.postcss.set('sourceMap', true)
   * ```
   */
  @deprecated(`bud.postcss`, `Use bud.postcss.set instead`, [
    [`set value of sourceMap`, `bud.postcss.set('sourceMap', true)`],
  ])
  public setSourceMap(sourceMap: boolean): this {
    this.set(`sourceMap`, sourceMap)
    return this
  }
}
