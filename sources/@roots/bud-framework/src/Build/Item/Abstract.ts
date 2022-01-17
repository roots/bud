import {Factory, Framework, Maybe} from '../..'
import * as Loader from '../Loader'
import {Options, Output} from '.'

/**
 * Item interface
 *
 * @public
 */
export default abstract class Item {
  /**
   * Loader
   *
   * @public
   */
  public abstract loader: Factory<[Framework], Loader.Interface>

  /**
   * Loader options
   *
   * @public
   */
  public abstract options: Factory<[Framework], Options>

  /**
   * Set loader
   *
   * @param factory - Function returning loader interface
   * @returns void
   *
   * @public
   */
  public abstract setLoader(
    factory: Maybe<[Framework], Loader.Interface>,
  ): void

  /**
   * Set options
   *
   * @param factory - Function returning options interface
   * @returns void
   *
   * @public
   */
  public abstract setOptions(factory: Maybe<[Framework], Options>): void

  /**
   * Merge option
   *
   * @param options - Options to merge
   * @param app - {@link Framework}
   * @returns void
   *
   * @public
   */
  public abstract mergeOptions(options: Options, app: Framework): void

  /**
   * Makes final Item output
   *
   * @param app - {@link Framework}
   * @returns finalized Item
   *
   * @public
   */
  public abstract make(app: Framework): Output
}
