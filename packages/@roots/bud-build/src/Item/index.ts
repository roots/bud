import {bind, isFunction} from './item.dependencies'
import {
  Factory,
  Framework,
  Item,
  Loader,
  Maybe,
} from './item.interface'

/**
 * Item class
 *
 * @public
 */
export default class
  extends Item.Abstract
  implements Item.Interface
{
  /**
   * Loader
   *
   * @public
   */
  public loader: Factory<[Framework], Loader.Interface>

  /**
   * Loader options
   *
   * @public
   */
  public options: Factory<[Framework], Item.Options>

  /**
   * Class constructor
   *
   * @param options - {@link Item.Options}
   */
  public constructor({
    loader,
    options,
  }: Item.ConstructorOptions) {
    super()

    this.setLoader(loader)
    options && this.setOptions(options)
  }

  /**
   * {@inheritDoc @roots/bud-framework#Item.Abstract.getLoader}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getLoader(app: Framework) {
    return this.loader(app)
  }

  /**
   * {@inheritDoc @roots/bud-framework#Item.Abstract.setLoader}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setLoader(
    loader: Maybe<[Framework], Loader.Interface>,
  ) {
    this.loader = isFunction(loader) ? loader : () => loader
  }

  /**
   * {@inheritDoc @roots/bud-framework#Item.Abstract.seOptions}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setOptions(options: Maybe<[Framework], Item.Options>) {
    this.options = isFunction(options) ? options : () => options
  }

  /**
   * {@inheritDoc @roots/bud-framework#Item.Abstract.mergeOptions}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public mergeOptions(options: Item.Options, app: Framework) {
    options = {
      ...this.options(app),
      ...options,
    }

    this.setOptions((app: Framework) => options)
  }

  /**
   * {@inheritDoc @roots/bud-framework#Item.Abstract.make}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public make(app: Framework): Item.Output {
    const output: Item.Output = {
      loader: this.loader(app).make(app),
    }

    if (this.options) {
      output.options = this.options(app)
    }

    return output
  }
}
