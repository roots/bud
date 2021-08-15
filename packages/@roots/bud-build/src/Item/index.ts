import type {Build, Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'

import {Base} from '../shared/Base'

export class Item extends Base implements Build.Item {
  protected loader: Build.Item.LoaderFn

  protected options: Build.Item.OptionsFn

  public constructor({
    loader,
    options,
  }: Build.Item.ConstructorOptions) {
    super()

    this.setLoader(loader)
    options && this.setOptions(options)
  }

  @bind
  public getLoader(app: Framework) {
    return this.loader(app)
  }

  @bind
  public setLoader(loader: Build.Loader | Build.Item.LoaderFn) {
    this.loader = isFunction(loader) ? loader : () => loader
  }

  @bind
  public setOptions(
    options: Build.Item.OptionsFn | Build.Item.Options,
  ) {
    this.options = isFunction(options) ? options : () => options
  }

  @bind
  public mergeOptions(
    options: Build.Item.Options,
    app: Framework,
  ) {
    options = {
      ...this.options(app),
      ...options,
    }

    this.setOptions((app: Framework) => options)
  }

  @bind
  public make(app: Framework): Build.Item.Output {
    const output: Build.Item.Output = {
      loader: this.loader(app).make(app),
    }

    if (this.options) {
      output.options = this.options(app)
    }

    return output
  }
}
