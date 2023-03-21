import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
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
type Registry = Map<string, [string | Plugin | Processor, any?]>

/**
 * PostCSS configuration options
 */
interface Options {
  sourceMap?: boolean
  postcssOptions?: {
    syntax?: string
    parser?: string
    plugins?: InputList
  }
}

/**
 * PostCSS configuration
 */
@label(`@roots/bud-postcss`)
@options<Options>({})
@expose(`postcss`)
export class BudPostCss extends Extension<Options> {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build}: Bud): Promise<void> {
    this.setPlugins({
      import: await this.resolve(`postcss-import`, import.meta.url),
      nesting: await this.resolve(`postcss-nested`, import.meta.url),
      env: [
        await this.resolve(`postcss-preset-env`, import.meta.url).then(
          path => path.replace(`.mjs`, `.cjs`),
        ),
        {
          stage: 1,
          features: {
            'focus-within-pseudo-class': false,
          },
        },
      ],
    })

    build
      .setLoader(
        `postcss`,
        await this.resolve(`postcss-loader`, import.meta.url),
      )
      .setItem(`postcss`, {
        loader: `postcss`,
        options: () => ({
          postcssOptions: this.postcssOptions,
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
    let plugins = []

    if (!this.plugins.size) return null

    this.plugins.has(`import`) && plugins.push(this.plugins.get(`import`))

    this.plugins.has(`nesting`) &&
      plugins.push(this.plugins.get(`nesting`))

    Array.from(this.plugins.entries())
      .filter(([k]) => ![`import`, `nesting`, `env`].includes(k))
      .forEach(([_k, v]: [string, any]) => plugins.push(v))

    this.plugins.has(`env`) && plugins.push(this.plugins.get(`env`))

    const options = {
      syntax: this.get(`postcssOptions.syntax`),
      parser: this.get(`postcssOptions.parser`),
      plugins: plugins.filter(Boolean),
    }

    this.logger.info(`postcss syntax`, options.syntax)
    this.logger.info(`postcss parser`, options.parser)
    this.logger.info(`postcss plugins`, options.plugins)

    return options as Options[`postcssOptions`]
  }

  /**
   * Plugins registry
   */
  protected readonly _plugins: Registry = new Map([])

  /**
   * PostCss plugins accessor
   */
  public get plugins() {
    return this._plugins
  }
  /**
   * Get plugins
   */
  @bind
  public getPlugins() {
    return this._plugins
  }

  /**
   * Replaces all plugins with provided value
   */
  @bind
  public setPlugins(plugins: InputRecords | InputMap | InputList): this {
    const pluginMap = (plugin: string | [string, any?]): [string, any?] =>
      Array.isArray(plugin) ? plugin : [plugin]

    const setPlugin = (plugin: [string, any?]): unknown =>
      this._plugins.set(...plugin)

    if (Array.isArray(plugins)) {
      plugins.map(pluginMap).forEach(setPlugin)
      return this
    }

    if (plugins instanceof Map) {
      Array.from(plugins.entries()).forEach(([k, v]) => {
        this.setPlugin(k, v)
      })

      return this
    }

    Object.entries(plugins).map(pluginMap).forEach(setPlugin)

    return this
  }

  /**
   * Set a plugin
   */
  @bind
  public setPlugin(name: string, plugin?: Input): this {
    if (isUndefined(plugin)) {
      this._plugins.set(name, [name])
      return this
    }

    if (Array.isArray(plugin)) {
      this._plugins.set(name, plugin)
      return this
    }

    this._plugins.set(name, [plugin])
    return this
  }

  /**
   * Remove a plugin
   */
  @bind
  public unsetPlugin(plugin: string) {
    this.plugins.has(plugin) && this.plugins.delete(plugin)

    return this
  }

  /**
   * Get plugin options
   */
  @bind
  public getPluginOptions(plugin: string): Record<string, any> {
    if (!this.plugins.has(plugin)) this.app.error(plugin, `does not exist`)

    return this.plugins.has(plugin) &&
      this.plugins.get(plugin).length &&
      this.plugins.get(plugin).length > 1
      ? this.plugins.get(plugin).pop()
      : {}
  }

  /**
   * Override plugin options
   */
  @bind
  public setPluginOptions(
    plugin: string,
    options:
      | Record<string, any>
      | ((options: Record<string, any>) => Record<string, any>),
  ): this {
    if (!this.plugins.has(plugin)) {
      this.app.error(plugin, `does not exist`)
    }

    this.plugins.set(plugin, [
      this.getPluginPath(plugin),
      isFunction(options)
        ? options(this.getPluginOptions(plugin))
        : options,
    ])

    return this
  }

  /**
   * Get plugin path
   */
  @bind
  public getPluginPath(plugin: string): string {
    return this.plugins.has(plugin) && this.plugins.get(plugin)?.length
      ? [...this.plugins.get(plugin)].shift()
      : this.plugins.get(plugin)
  }

  /**
   * Set plugin path
   */
  @bind
  public setPluginPath(plugin: string, path: string): this {
    const target = this.plugins.get(plugin)
    const hasOptions = target.length && target.length > 1

    this.setPlugin(plugin, hasOptions ? [path, target.pop()] : [path])

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
