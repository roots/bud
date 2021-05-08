import {Framework} from '@roots/bud-framework'
import {Loader} from '../Loader/index'

export class Item {
  protected loader
  protected options

  public constructor({
    loader,
    options,
  }: {
    loader: (app: Framework) => Loader
    options?: (app: Framework) => any
  }) {
    this.loader = loader
    this.options = options
  }

  public make(app) {
    const output: {
      loader: (app: Framework) => Loader
      options?: (app: Framework) => any
    } = {loader: this.loader(app)}

    if (this.options) {
      output.options = this.options(app)
    }

    return output
  }
}
