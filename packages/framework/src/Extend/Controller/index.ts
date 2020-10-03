import App from '../../Bud'
import * as Webpack from 'webpack'
import * as Extension from './../Extension'

export class Controller implements Interface {
  public bud: App

  public constructor(bud: App) {
    this.bud = bud

    this.make = this.make.bind(this)

    this.bud.on('webpack.plugins', plugins =>
      plugins.filter(plugin => plugin),
    )
  }

  public make(factory: Extension.Factory): Extension.Product {
    const extension: Extension.Interface = factory(this.bud)

    if (extension.when && extension.when()) {
      return extension.make()
    }
  }
}

export interface Interface {
  bud: App

  extension?: Extension.Interface

  make(factory: Extension.Factory): Webpack.Plugin | void
}
