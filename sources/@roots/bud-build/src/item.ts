import type {Bud, Build} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'

import Base from './shared/base.js'

namespace Item {
  export type ConstructorOptions = Build.Item.ConstructorOptions
}

/**
 * Item class
 *
 * @public
 */
class Item extends Base implements Build.Item {
  /**
   * Loader
   *
   * @public
   */
  public loader: Build.Item['loader']

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
    _app: () => Bud,
    options?: {
      loader?: Item['loader']
      options?: Item['options']
    },
  ) {
    super(_app)
    options?.loader && this.setLoader(options.loader)
    options?.options && this.setOptions(options.options)
  }

  /**
   * Get rule set item loader
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getLoader(): Build.Loader {
    return this.app.build.loaders[this.unwrap(this.loader)]
  }

  /**
   * Set rule set item loader
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setLoader(loader: Build.Item['loader']): this {
    this.loader = loader
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
    this.options = this.wrap(options)
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
    options = {
      ...(this.getOptions() ?? {}),
      ...options,
    }

    this.setOptions(options)
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
    const loader = this.getLoader()
    if (!loader) this.app.error(loader, `missing`, this)

    const output: Build.Item.Output = {
      loader: this.getLoader().getSrc(),
    }

    if (this.options) {
      output.options = this.getOptions()
    }

    return output
  }
}

export {Item as default}
