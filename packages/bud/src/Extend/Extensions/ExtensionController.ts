import Bud from '@roots/bud-types'

class ExtensionController {
  public bud

  public constructor(bud: Bud) {
    this.bud = bud
    this.make = this.make.bind(this)
  }

  public make(plugin: Bud.Plugin.Factory): Bud.Plugin.Product {
    const pluginObj: any = plugin(this.bud)

    if (pluginObj.when && pluginObj.when()) {
      pluginObj.make()
    }
  }
}

export {ExtensionController as default}
