import type {Bud, Loaders} from '@roots/bud-framework'
import type * as Build from '@roots/bud-framework/services/build'

import {basename} from 'path'

import {bind} from '@roots/bud-support/decorators/bind'
import isString from '@roots/bud-support/lodash/isString'

import {Loader} from '../loader/index.js'
import Base from '../shared/base.js'

export type ConstructorOptions = Build.Item.ConstructorOptions

/**
 * Item class
 */
class Item extends Base implements Build.Item {
  /**
   * Identifier
   */
  public ident: string

  /**
   * Loader
   */
  public loader: `${keyof Loaders & string}` | Loader

  /**
   * Loader options
   */
  public options: Build.Item['options']

  /**
   * Class constructor
   */
  public constructor(
    public override _app: () => Bud,
    constructorParams?: {
      ident?: string
      loader?: `${keyof Loaders & string}` | Loader
      options?: Item['options']
    },
  ) {
    super(_app)

    constructorParams?.ident && this.setIdent(constructorParams.ident)
    constructorParams?.loader && this.setLoader(constructorParams.loader)

    !constructorParams?.ident &&
      constructorParams?.loader &&
      this.setIdent(
        isString(constructorParams.loader)
          ? constructorParams.loader
          : basename(constructorParams.loader.getSrc()),
      )

    constructorParams?.options &&
      this.setOptions(constructorParams.options)
  }

  @bind
  public getIdent(): Build.Item['ident'] {
    return this.ident
  }

  /**
   * Get rule set item loader
   */
  @bind
  public getLoader(): Loader {
    return this.loader instanceof Loader
      ? this.loader
      : this.app.build.loaders[this.loader]
  }

  /**
   * Get rule set item options
   */
  @bind
  public getOptions(): Item['options'] {
    return this.unwrap(this.options)
  }

  /**
   * Merge rule set item options
   */
  @bind
  public mergeOptions(options: Build.Item.Options): this {
    this.setOptions({
      ...(this.getOptions() ?? {}),
      ...options,
    })

    return this
  }

  @bind
  public setIdent(ident: Build.Item['ident']): this {
    this.ident = ident
    return this
  }

  /**
   * Set rule set item loader
   */
  @bind
  public setLoader(loader: `${keyof Loaders & string}` | Loader): this {
    this.loader = loader

    if (!this.ident)
      this.setIdent(basename(isString(loader) ? loader : loader.getSrc()))

    return this
  }

  /**
   * Set rule set item options
   */
  @bind
  public setOptions(options: Item['options']) {
    this.options = options
    return this
  }

  /**
   * Produce rule set item object for Webpack
   */
  @bind
  public toWebpack(): Build.Item.Output {
    const output: Build.Item.Output = {
      loader: this.getLoader()?.getSrc(),
    }

    if (this.options) {
      output.options = this.getOptions()
    }

    if (this.ident) {
      output.ident = this.getIdent()
    }

    if (!output.loader) {
      this.app.error(`error in ${this.ident}`, `no loader registered`)
    }

    return Object.entries(output).reduce(
      (output, [key, value]) => ({
        ...(output ?? {}),
        ...(value ? {[key]: value} : {}),
      }),
      {},
    )
  }
}

export {Item}
