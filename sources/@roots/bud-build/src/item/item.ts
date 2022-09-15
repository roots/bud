import type {Bud} from '@roots/bud-framework/bud'
import type * as Build from '@roots/bud-framework/services/build'
import type {Loaders} from '@roots/bud-framework/src/types/services/build/registry.js'
import {bind} from '@roots/bud-support/decorators'
import {isString} from '@roots/bud-support/lodash-es'
import {basename} from 'path'

import Loader from '../loader/loader.js'
import Base from '../shared/base.js'

export type ConstructorOptions = Build.Item.ConstructorOptions

/**
 * Item class
 *
 * @public
 */
class Item extends Base implements Build.Item {
  /**
   * Identifier
   * @public
   */
  public ident: string

  /**
   * Loader
   *
   * @public
   */
  public loader: Loader | `${keyof Loaders & string}`

  /**
   * Loader options
   *
   * @public
   */
  public options: Build.Item['options']

  /**
   * Class constructor
   *
   * @param options - {@link Build.Item.Options}
   */
  public constructor(
    protected _app: () => Bud,
    options?: {
      ident?: string
      loader?: Loader | `${keyof Loaders & string}`
      options?: Item['options']
    },
  ) {
    super(_app)

    options?.ident && this.setIdent(options.ident)
    options?.loader && this.setLoader(options.loader)
    !options?.ident &&
      options?.loader &&
      this.setIdent(
        isString(options.loader)
          ? options.loader
          : basename(options.loader.getSrc()),
      )

    options?.options && this.setOptions(options.options)
  }

  @bind
  public getIdent(): Build.Item['ident'] {
    return this.ident
  }

  @bind
  public setIdent(ident: Build.Item['ident']): this {
    this.ident = ident
    return this
  }

  /**
   * Get rule set item loader
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getLoader(): Loader {
    return this.loader instanceof Loader
      ? this.loader
      : this.app.build.loaders[this.loader]
  }

  /**
   * Set rule set item loader
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setLoader(loader: Loader | `${keyof Loaders & string}`): this {
    this.loader = loader
    if (!this.ident)
      this.setIdent(basename(isString(loader) ? loader : loader.getSrc()))
    return this
  }

  /**
   * Get rule set item options
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getOptions(): Item['options'] {
    return this.unwrap(this.options)
  }

  /**
   * Set rule set item options
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setOptions(options: Item['options']) {
    this.options = options
    return this
  }

  /**
   * Merge rule set item options
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public mergeOptions(options: Build.Item.Options) {
    this.setOptions({
      ...(this.getOptions() ?? {}),
      ...options,
    })

    return this
  }

  /**
   * Produce rule set item object for Webpack
   *
   * @public
   * @decorator `@bind`
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

    return output
  }
}

export {Item as default}
