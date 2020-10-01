import Bud from '@roots/bud-types'
import webpack from 'webpack'

export default class PluginController {
  bud: Bud

  public constructor(bud: Bud) {
    this.bud = bud
    this.make = this.make.bind(this)
  }

  public make(plugin: Bud.Plugin.WebpackPlugin): webpack.Plugin {
    if (!plugin.when) {
      return plugin.make()
    }

    if (plugin?.when && plugin.when()) {
      return plugin.make()
    }
  }
}
