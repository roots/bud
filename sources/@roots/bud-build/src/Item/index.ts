import {bind, isFunction} from './item.dependencies'
import {Base, Factory, Framework, Loader, Maybe} from './item.interface'

/**
 * Item class
 *
 * @public
 */
export class Item extends Base.Abstract implements Base.Interface {
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
  public options: Factory<[Framework], Base.Options>

  /**
   * Class constructor
   *
   * @param options - {@link Base.Options}
   */
  public constructor({loader, options}: Base.ConstructorOptions) {
    super()

    this.setLoader(loader)
    options && this.setOptions(options)
  }

  /**
   * {@inheritDoc @roots/Framework-Framework#Item.Abstract.getLoader}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getLoader(app: Framework) {
    return this.loader(app)
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public setLoader(loader: Maybe<[Framework], Loader.Interface>) {
    this.loader = isFunction(loader) ? loader : () => loader
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public setOptions(options: Maybe<[Framework], Base.Options>) {
    this.options = isFunction(options) ? options : () => options
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public mergeOptions(options: Base.Options, app: Framework) {
    options = {
      ...this.options(app),
      ...options,
    }

    this.setOptions((app: Framework) => options)
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public make(app: Framework): Base.Output {
    const output: Base.Output = {
      loader: this.loader(app).make(app),
    }

    if (this.options) {
      output.options = this.options(app)
    }

    return output
  }
}
