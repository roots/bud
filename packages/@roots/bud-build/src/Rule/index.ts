import {Framework} from '@roots/bud-framework'
import {Item} from '../Item/index'

export class Rule {
  protected test
  protected use
  protected exclude
  protected type

  public constructor({
    test,
    use = null,
    exclude = null,
    type = null,
  }: {
    test: (app: Framework) => RegExp
    use?: (app: Framework) => Item[]
    exclude?: (app: Framework) => RegExp
    type?: (app: Framework) => string
  }) {
    this.test = test
    this.use = use
    this.exclude = exclude
    this.type = type
  }

  public make(app: Framework) {
    const output: {
      test: (app: Framework) => RegExp
      use?: (app: Framework) => Item[]
      exclude?: (app: Framework) => RegExp
      type?: (app: Framework) => string
    } = {
      test: this.test(app),
    }

    if (this.use) {
      output.use = this.use(app).map(Item => Item.make(app))
    }

    if (this.exclude) {
      output.exclude = this.exclude(app)
    }

    if (this.type) {
      output.type = this.type(app)
    }

    return output
  }
}
