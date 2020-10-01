import * as Webpack from 'webpack'
import PluginController from './PluginController'
import Bud from '@roots/bud-types'
import Container, {Loose} from '@roots/container'

/**
 * Webpack Plugins
 */
export default class Plugins extends Container {
  // lifecycle
  protected controller: Bud.Plugin.Controller
  protected bud: Bud

  constructor(
    bud: Bud,
    plugins: {[key: string]: Bud.Plugin.Factory} = {},
  ) {
    super(plugins)

    this.bud = bud
    this.controller = new PluginController(bud)

    this.register(plugins)
  }

  /**
   * Register plugin entry/entries
   */
  public register(entries: {
    [key: string]: Bud.Plugin.Factory
  }): void {
    this.repository = {
      ...this.repository,
      ...entries,
    }
  }

  /**
   * Getter for registered plugin
   */
  public getOptions(name: string): unknown {
    return this.get(`${name}`)
  }

  /**
   * Setter for registered plugins.
   */
  public setOptions(name: string, options: Loose): void {
    this.set(`${name}.options`, options)
  }

  /**
   * Make plugin and return as specified
   *
   * @see {Webpack.Plugin}
   */
  public make(): Webpack.Configuration['plugins'] {
    return this.entries()
      .map(
        ([, plugin]: [
          name: string,
          plugin: Bud.Plugin.Factory,
        ]) => {
          return this.controller.make(plugin(this.bud))
        },
      )
      .filter(plugin => plugin)
  }
}
