import type {Framework} from '@roots/bud-framework'
import type {Rule as Contract} from './interface'
import type {Item} from '../Item/interface'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'

class Rule implements Contract {
  protected test: Contract.TestFn
  protected use: Contract.UseFn
  protected exclude: Contract.ExcludeFn
  protected type: Contract.TypeFn

  public constructor({
    test,
    use = null,
    exclude = null,
    type = null,
  }: {
    test: RegExp | Contract.TestFn
    use?: Item[] | Contract.UseFn
    exclude?: RegExp | Contract.ExcludeFn
    type?: string | Contract.TypeFn
  }) {
    this.test = isFunction(test) ? test : () => test

    if (use) {
      this.use = isFunction(use) ? use : () => use
    }

    if (exclude) {
      this.exclude = isFunction(exclude)
        ? exclude
        : () => exclude
    }

    if (type) {
      this.type = isFunction(type) ? type : () => type
    }
  }

  @bind
  public getTest(app: Framework): RegExp {
    return this.test ? this.test(app) : null
  }

  @bind
  public setTest(
    test: RegExp | ((app: Framework) => RegExp),
  ): void {
    this.test = isFunction(test) ? test : () => test
  }

  @bind
  public getUse(app: Framework): Item[] {
    return this.use ? this.use(app) : null
  }

  @bind
  public setUse(use: Contract.UseFn | Item[]): void {
    this.use = isFunction(use) ? use : () => use
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
    this.type = isFunction(type) ? type : () => type
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
      output.use = this.use(app).map(item => item.make(app))
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

export {Rule}
