import Bud from '@roots/bud-types'
import BaseController from './Controller'

class ExtensionController extends BaseController {
  public plugin?: Bud.Plugin.Extension

  public constructor(bud: Bud) {
    super(bud)

    this.make = this.make.bind(this)
  }

  public make(): Bud.Plugin.Product {
    if (this.plugin.when && this.plugin.when()) {
      this.plugin.make()
    }
  }
}

export {ExtensionController as default}
