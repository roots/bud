import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
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
 * PostCSS support extension for `@roots/bud`
 *
 * @public
 * @decorator `@expose`
 * @decorator `@label`
 */
@label(`@roots/bud-postcss`)
@expose(`postcss`)
export class BudPostCss extends Extension {
  /**
   * Syntax
   *
   * @public
   */
  protected _syntax: string = null

  /**
   * Source map
   *
   * @public
   */
  protected _sourceMap: boolean = true

  /**
   * Plugins registry
   *
   * @public
   */
  protected readonly _plugins: Registry = new Map([])

  /**
   * Extension registration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(app: Bud): Promise<void> {
    this.setPlugins({
      import: await this.resolve(`postcss-import`),
      nesting: await this.resolve(`postcss-nested`),
      env: [
        await this.resolve(`postcss-preset-env`).then(path =>
          path.replace(`.mjs`, `.cjs`),
        ),
        {
          stage: 1,
          features: {
            'focus-within-pseudo-class': false,
          },
        },
      ],
    })

    app.build
      .setLoader(`postcss`, await this.resolve(`postcss-loader`))
      .setItem(`postcss`, {
        loader: `postcss`,
        options: () => ({
          sourceMap: this.sourceMap,
          postcssOptions: this.postcssOptions,
        }),
      })

    app.build.rules.css.setUse(items => [...(items ?? []), `postcss`])
    app.build.rules.cssModule?.setUse(items => [
      ...(items ?? []),
      `postcss`,
    ])
  }

  /**
   * postcss-loader `postcssOptions` accessor
   *
   * @public
   */
  protected get postcssOptions() {
    let plugins = []

    if (!this.plugins.size) return null

    this.plugins.has(`import`) && plugins.push(this.plugins.get(`import`))

    this.plugins.has(`nesting`) &&
      plugins.push(this.plugins.get(`nesting`))

    Array.from(this.plugins.entries())
      .filter(([k, v]) => ![`import`, `nesting`, `env`].includes(k))
      .forEach(([k, v]) => plugins.push(v))

    this.plugins.has(`env`) && plugins.push(this.plugins.get(`env`))

    return {
      ...(this.syntax ? {syntax: this.syntax} : {}),
      plugins: plugins.filter(Boolean),
    }
  }

  /**
   * postcss-loader's `postcssOptions.syntax` accessor
   *
   * @public
   */
  public get syntax() {
    return this._syntax
  }
  public set syntax(syntax: string) {
    this._syntax = syntax
  }

  /**
   * Get postcss-loader's `syntax` option
   *
   * @public
   */
  public getSyntax(): string {
    return this.syntax
  }

  /**
   * Set postcss-loader's `syntax` option
   *
   * @public
   */
  public setSyntax(syntax: string): this {
    this.syntax = syntax
    return this
  }

  /**
   * postcss-loader's source-map option accessor
   *
   * @public
   */
  public get sourceMap(): boolean {
    return this._sourceMap
  }
  public set sourceMap(sourceMap: boolean) {
    this._sourceMap = sourceMap
  }

  /**
   * Get postcss-loader's source-map option
   *
   * @public
   */
  public getSourceMap(): boolean {
    return this._sourceMap
  }

  /**
   * Set postcss-loader's source-map option
   *
   * @public
   */
  public setSourceMap(sourceMap: boolean): this {
    this.sourceMap = sourceMap
    return this
  }

  /**
   * PostCss plugins accessor
   *
   * @public
   */
  public get plugins() {
    return this._plugins
  }

  /**
   * Get plugins
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getPlugins() {
    return this.plugins
  }

  /**
   * Sets all plugins
   *
   * @param plugins - Map or keyed object
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param name - plugin handle
   * @param plugin - the plugin object or a tuple of plugin and options
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param plugin - handle of plugin to remove
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public unsetPlugin(plugin: string) {
    this.plugins.has(plugin) && this.plugins.delete(plugin)

    return this
  }

  /**
   * Get plugin options
   *
   * @param plugin - handle of plugin to modify options of
   * @returns the plugin options
   *
   * @public
   * @decorator `@bind`
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
   * Override options on a plugin
   *
   * @param plugin - handle of plugin to modify options of
   * @param options - the options to set
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param plugin - handle of plugin to modify options of
   * @returns the plugin path
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getPluginPath(plugin: string): string {
    return this.plugins.has(plugin) && this.plugins.get(plugin)?.length
      ? [...this.plugins.get(plugin)].shift()
      : this.plugins.get(plugin)
  }

  /**
   * Set plugin path
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setPluginPath(plugin: string, path: string): this {
    const target = this.plugins.get(plugin)
    const hasOptions = target.length && target.length > 1

    this.setPlugin(plugin, hasOptions ? [path, target.pop()] : [path])

    return this
  }
}
