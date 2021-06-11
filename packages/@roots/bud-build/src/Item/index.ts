import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'
import {Base} from '../shared/Base'

import type {
  Framework,
  Loader,
  Item as Contract,
} from '@roots/bud-framework'

export class Item extends Base implements Contract {
  protected loader: Contract.LoaderFn
  protected options: Contract.OptionsFn

  public constructor({
    loader,
    options,
  }: Contract.ConstructorOptions) {
    super()

    this.setLoader(loader)
    options && this.setOptions(options)
  }

  @bind
  public getLoader(app: Framework) {
    return this.loader(app)
  }

  @bind
  public setLoader(loader: Loader | Contract.LoaderFn) {
    this.loader = isFunction(loader) ? loader : () => loader
  }

  @bind
  public setOptions(
    options: Contract.OptionsFn | Contract.Options,
  ) {
    this.options = isFunction(options) ? options : () => options
  }

  @bind
  public mergeOptions(
    options: Contract.Options,
    app: Framework,
  ) {
    options = {
      ...this.options(app),
      ...options,
    }

    this.setOptions((app: Framework) => options)
  }

  @bind
  public make(app: Framework): Contract.Output {
    const output: Contract.Output = {
      loader: this.loader(app).make(app),
    }

    if (this.options) {
      output.options = this.options(app)
    }

    return output
  }
}
