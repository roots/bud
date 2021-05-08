import {Framework} from '@roots/bud-framework'
import {Item} from '../Item/index'
import {BaseComponent} from '../shared/Base'
import {boundMethod as bind} from 'autobind-decorator'

export {Rule}

interface Rule {
  getTest(app: Framework): RegExp
  setTest(test: RegExp | ((app: Framework) => RegExp)): void
}

class Rule extends BaseComponent {
  protected test: (app: Framework) => RegExp
  protected use: (app: Framework) => Item[]
  protected exclude: (app: Framework) => RegExp
  protected type: (app: Framework) => string

  public constructor({
    test,
    use = null,
    exclude = null,
    type = null,
  }: {
    test: RegExp | ((app: Framework) => RegExp)
    use?: Item[] | ((app: Framework) => Item[])
    exclude?: RegExp | ((app: Framework) => RegExp)
    type?: string | ((app: Framework) => string)
  }) {
    super()

    this.test = this.normalizeInput<RegExp>(test)

    if (use) {
      this.use = this.normalizeInput<Item[]>(use)
    }

    if (exclude) {
      this.exclude = this.normalizeInput<RegExp>(exclude)
    }

    if (type) {
      this.type = this.normalizeInput<string>(type)
    }
  }

  @bind
  public getTest(app: Framework): RegExp {
    return this.test ? this.test(app) : null
  }

  @bind
  public setTest(test: RegExp | ((app: Framework) => RegExp)) {
    this.test = this.normalizeInput(test)
  }

  @bind
  public getUse(app: Framework) {
    return this.use ? this.use(app) : null
  }

  @bind
  public setUse(use: (app: Framework) => Item[]) {
    this.use = use
  }

  @bind
  public getExclude(app: Framework) {
    return this.exclude ? this.exclude(app) : null
  }

  @bind
  public setExclude(exclude: (app: Framework) => RegExp) {
    this.exclude = exclude
  }

  @bind
  public getType(app: Framework) {
    return this.type ? this.type(app) : null
  }

  @bind
  public setType(type) {
    this.type = type
  }

  @bind
  public make(app: Framework) {
    const output: {
      test: RegExp
      use?: {
        loader: string
        options?: {[key: string]: any}
      }[]
      exclude?: RegExp
      type?: string
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
