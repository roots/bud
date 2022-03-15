import {Framework, Item as Contract, Loader} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'

import {Base} from '../shared/Base'

export namespace Item {
  export type ConstructorOptions = Contract.ConstructorOptions
}

/**
 * Item class
 *
 * @public
 */
export class Item extends Base implements Contract {
  /**
   * Loader
   *
   * @public
   */
  public loader: Contract['loader']

  /**
   * Loader options
   *
   * @public
   */
  public options: Contract['options']

  /**
   * Class constructor
   *
   * @param options - {@link Contract.Options}
   */
  public constructor(
    _app: () => Framework,
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
   * {@inheritDoc @roots/Framework-Framework#Item.Abstract.getLoader}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getLoader(): Loader {
    return this.app.build.loaders[this.unwrap(this.loader)]
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public setLoader(loader: Contract['loader']) {
    this.loader = loader
    return this
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public setOptions(options: Item['options']) {
    this.options = this.wrap(options)
    return this
  }
  @bind
  public getOptions(): Item['options'] {
    return this.unwrap(this.options)
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public mergeOptions(options: Contract.Options) {
    options = {
      ...(this.getOptions() ?? {}),
      ...options,
    }

    this.setOptions(options)
    return this
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public toWebpack(): Contract.Output {
    const loader = this.getLoader()
    if (!loader) this.app.error(loader, `missing`, this)

    const output: Contract.Output = {
      loader: this.getLoader().getSrc(),
    }

    if (this.options) {
      output.options = this.getOptions()
    }

    return output
  }
}
