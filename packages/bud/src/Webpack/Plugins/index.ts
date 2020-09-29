import * as Webpack from 'webpack'
import PluginController from '../../Extend/PluginController'
import Bud from '@roots/bud-types'
import Container from '@roots/container'

class Plugins extends Container {
  /**
   * Options store
   */
  public store?: Container

  /**
   * Lifecycle handler
   */
  protected controller: Bud.Plugin.Controller

  constructor(
    bud: Bud,
    plugins?: {[key: string]: Bud.Plugin.Factory},
  ) {
    super(plugins ?? {})
    this.controller = new PluginController(bud)
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
   * Make plugin and return as specified
   * @see {Webpack.Plugin}
   */
  public make(): Webpack.Configuration['plugins'] {
    return Object.keys(this.entries()).reduce(
      (plugins, plugin: string) => {
        const results = this.controller.select(plugin).make()

        if (results) {
          return [...plugins, results]
        }

        return plugins
      },
      [],
    )
  }
}

export {Plugins as default}
