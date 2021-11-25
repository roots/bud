import {Framework} from '@roots/bud-api/src/api/methods/alias/alias.interface'
import {bind} from '@roots/bud-support'
import {Container} from '@roots/container'

interface Registry {
  [key: string]: [any, any?]
}

export class PostCssConfig extends Container<Registry> {
  /**
   * @internal
   */
  public _app: () => Framework

  /**
   * Application instance
   *
   * @internal
   */
  public get app() {
    return this._app()
  }

  /**
   * Constructor
   *
   * @public
   */
  public constructor(app: Framework) {
    super({})

    this._app = () => app
  }

  @bind
  public setPlugin(
    name: string,
    plugin: [any, any?] | [any],
  ): this {
    if (Array.isArray(plugin)) {
      this.set(name, Array.isArray(plugin) ? plugin : [plugin])
      return this
    }

    return this
  }

  @bind
  public setPlugins(plugins: {
    [key: string]: [any, any?]
  }): this {
    const store = Object.entries(plugins).reduce(
      (all, [key, plugin]) => {
        return {
          ...all,
          [key]: Array.isArray(plugin) ? plugin : [plugin],
        }
      },
      {},
    )
    this.setStore(store)

    return this
  }

  @bind
  public unsetPlugin(plugin: string) {
    this.has(plugin) && this.remove(plugin)
    return this
  }

  @bind
  public setPluginOptions(plugin: string, options: any): this {
    this.set(plugin, [this.get(plugin).shift(), options])
    return this
  }
}
