import {Framework} from '@roots/bud-framework'
import {Loader} from '../Loader/index'
import {boundMethod as bind} from 'autobind-decorator'
import {BaseComponent} from '../shared/Base'

export class Item extends BaseComponent {
  protected loader: (app: Framework) => Loader
  protected options: (app: Framework) => {[key: string]: any}

  public constructor({
    loader,
    options,
  }: {
    loader: (app: Framework) => Loader
    options?: (app: Framework) => any
  }) {
    super()

    this.loader = this.normalizeInput(loader)

    if (options) {
      this.options = this.normalizeInput(options)
    }
  }

  @bind
  public make(app: Framework) {
    const output: {
      loader: string
      options?: {[key: string]: any}
    } = {
      loader: this.loader(app).make(app),
    }

    if (this.options) {
      output.options = this.options(app)
    }

    return output
  }
}
