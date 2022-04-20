import './env'

import {Extension} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {Plugin, Processor} from 'postcss'

type InputRecords = Record<
  string,
  string | Plugin | Processor | [string | Plugin | Processor, any?]
>
type InputMap = Map<
  string,
  string | Plugin | Processor | [string | Plugin | Processor, any?]
>
type Registry = Map<string, [any, any?] | [Plugin | Processor]>

class BudPostCss extends Extension.Extension<any, any> {
  public label = '@roots/bud-postcss'

  /** @readonly */
  protected _sourceMap: boolean = true

  /** @readonly */
  protected _syntax: string

  /** @readonly */
  protected _plugins: Registry = new Map([])

  /**
   * postcss-loader `postcssOptions` accessor
   *
   * @readonly
   */
  protected get postcssOptions() {
    return {
      ...(this.syntax ? {syntax: this.syntax} : {}),
      ...(this.plugins.size ? {plugins: [...this.plugins.values()]} : {}),
    }
  }

  /**
   * Syntax option
   *
   * @remarks
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
   * PostCss loader source-map option
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
    this._plugins = plugins
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
  public setPlugin(
    name: string,
    plugin?: [any, any?] | string | Plugin | Processor,
  ): this {
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
  public setPlugins(plugins: InputRecords | InputMap): this {
    this.plugins.clear()

    const pluginMap: InputMap =
      plugins instanceof Map ? plugins : new Map(Object.entries(plugins))

    pluginMap.forEach((v, k) => {
      this.plugins.set(k, Array.isArray(v) ? v : [v])
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
      this.plugins.has(plugin) && this.plugins.get(plugin).length
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
     * Expose this class to bud.postcss
     */
    this.app.postcss = this

    /**
     * Install postcss-loader, postcss-loader options, and
     * modify the css rule to utilize them.
     */
    this.app.build
      .setLoader('postcss', this.resolve('postcss-loader'))
      .setItem('postcss', {
        loader: 'postcss',
        options: () => ({
          postcssOptions: this.postcssOptions,
          sourceMap: this.sourceMap,
        }),
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
