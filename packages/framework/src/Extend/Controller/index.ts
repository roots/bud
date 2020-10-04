import Bud from '../../Bud'
import * as Extension from './../Extension'
import * as Webpack from 'webpack'

export class Controller implements Interface {
  public bud: Bud

  public constructor(bud: Bud) {
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
  bud: Bud

  extension?: Extension.Interface

  make(factory: Extension.Factory): Webpack.Plugin | void
}
