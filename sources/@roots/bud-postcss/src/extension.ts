import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import {isFunction} from 'lodash-es'
import {Plugin, Processor} from 'postcss'

type Input =
  | string
  | Plugin
  | Processor
  | [string | Plugin | Processor, any?]

type InputList = Array<string>
type InputRecords = Record<string, Input>
type InputMap = Map<string, Input>
type Registry = Map<string, [any, any?] | [Plugin | Processor]>

/**
 * PostCSS support extension for `@roots/bud`
 *
 * @public
 * @decorator `@expose`
 * @decorator `@label`
 */
@expose('postcss')
@label('@roots/bud-postcss')
export default class BudPostCss extends Extension {
  protected _syntax: string = null

  protected _sourceMap: boolean = true

  protected readonly _plugins: Registry = new Map([])

  /**
   * postcss-loader `postcssOptions` accessor
   *
   * @public
   */
  protected get postcssOptions() {
    return {
      ...(this.syntax ? {syntax: this.syntax} : {}),
      ...(this.plugins.size ? {plugins: [...this.plugins.values()]} : {}),
    }
  }

  /**
   * postcss-loader's `postcssOptions.syntax`
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
   * postcss-loader's source-map option
   *
   * @public
   */
  public get sourceMap() {
    return this._sourceMap
  }
  public set sourceMap(sourceMap: boolean) {
    this._sourceMap = sourceMap
  }

  /**
   * PostCss plugins
   *
   * @public
   */
  public get plugins() {
    return this._plugins
  }
  public set plugins(plugins: Registry) {
    plugins.forEach((v, k) => this._plugins.set(k, v))
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
    this._plugins.clear()

    const pluginMap: InputMap = Array.isArray(plugins)
      ? new Map(plugins.map(plugin => [plugin, plugin]))
      : plugins instanceof Map
      ? plugins
      : new Map(Object.entries(plugins))

    pluginMap.forEach((v, k) => {
      this._plugins.set(k, Array.isArray(v) ? v : [v])
    })

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
    const modulePath = plugin ?? [name]

    this.plugins.set(
      name,
      Array.isArray(modulePath) ? modulePath : [modulePath],
    )

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
    if (!this.plugins.has(plugin)) this.app.error(plugin, 'does not exist')

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
      this.app.error(plugin, 'does not exist')
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

  /**
   * Extension registration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    const loader = await this.resolve('postcss-loader')
    const importPlugin = await this.resolve('postcss-import')
    const nestedPlugin = await this.resolve('postcss-nested')
    const presetEnv = await this.resolve('postcss-preset-env').then(path =>
      path.replace('.mjs', '.cjs'),
    )

    /**
     * Install postcss-loader, postcss-loader options, and
     * modify the css rule to utilize them.
     */
    this.app.build
      .setLoader('postcss', loader)
      .setItem('postcss', {
        loader: 'postcss',
        options: () => {
          return {
            postcssOptions: this.postcssOptions,
            sourceMap: this.sourceMap,
          }
        },
      })
      .rules.css.setUse(['precss', 'css', 'postcss'])

    this.setPlugins(
      new Map([
        ['postcss-import', [importPlugin]],
        ['postcss-nested', [nestedPlugin]],
        [
          'postcss-preset-env',
          [
            presetEnv,
            {
              stage: 1,
              features: {
                'focus-within-pseudo-class': false,
              },
            },
          ],
        ],
      ]),
    )
  }
}
