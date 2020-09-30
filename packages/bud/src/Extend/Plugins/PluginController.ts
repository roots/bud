import Bud from '@roots/bud-types'
import BaseController from '../Controller'

export default class PluginController extends BaseController {
  public plugin?: Bud.Plugin.WebpackPlugin

  public constructor(bud: Bud) {
    super(bud)

    this.make = this.make.bind(this)
  }

  public make(): Bud.Plugin.Product {
    if (this.plugin.when && this.plugin.when()) {
      return this.plugin.make()
    }
  }
}
