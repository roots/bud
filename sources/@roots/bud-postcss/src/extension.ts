import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
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

@label('@roots/bud-postcss')
@expose('postcss')
class BudPostCss extends Extension {
  protected _syntax: string = null

  protected _sourceMap: boolean = true

  protected readonly _plugins: Registry = new Map([])

  /**
   * postcss-loader `postcssOptions` accessor
   */
  protected get postcssOptions() {
    return {
      ...(this.syntax ? {syntax: this.syntax} : {}),
      ...(this.plugins.size ? {plugins: [...this.plugins.values()]} : {}),
    }
  }

  /**
   * postcss-loader's `postcssOptions.syntax`
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
   */
  public get plugins() {
    return this._plugins
  }
  public set plugins(plugins: Registry) {
    plugins.forEach((v, k) => this._plugins.set(k, v))
  }

  /**
   * Set a plugin
   *
   * @param name - plugin handle
   * @param plugin - the plugin object or a tuple of plugin and options
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind` - binds the method to the class instance
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
   * Sets all plugins
   *
   * @param plugins - Map or keyed object
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind` - binds the method to the class instance
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
   * Remove a plugin
   *
   * @param plugin - handle of plugin to remove
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind` - binds the method to the class instance
   */
  @bind
  public unsetPlugin(plugin: string) {
    this.plugins.has(plugin) && this.plugins.delete(plugin)

    return this
  }

  /**
   * Override options on a plugin
   *
   * @param plugin - handle of plugin to modify options of
   * @param options - the options to set
   * @returns the bud.postcss instance
   *
   * @public
   * @decorator `@bind` - binds the method to the class instance
   */
  @bind
  public setPluginOptions(
    plugin: string,
    options: Record<string, any>,
  ): this {
    this.plugins.set(plugin, [
      this.plugins.has(plugin) && this.plugins.get(plugin)?.length
        ? this.get(plugin).shift()
        : this.get(plugin),
      options,
    ])

    return this
  }

  /**
   * Extension registration
   *
   * @public
   * @decorator `@bind` - binds the method to the class instance
   */
  @bind
  public async register() {
    /**
     * Install postcss-loader, postcss-loader options, and
     * modify the css rule to utilize them.
     */
    this.app.build
      .setLoader('postcss', this.resolve('postcss-loader'))
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

    /**
     * Configure defaults
     */
    this.setPlugins(
      new Map([
        ['postcss-import', [this.resolve('postcss-import')]],
        ['postcss-nested', [this.resolve('postcss-nested')]],
        [
          'postcss-preset-env',
          [
            this.resolve('postcss-preset-env'),
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

export default BudPostCss
