import {Factory, Framework, Maybe} from '../..'
import * as Loader from '../Loader'
import {Options, Output} from '.'

/**
 * Item interface
 *
 * @public
 */
export default interface Item {
  /**
   * Loader
   *
   * @public
   */
  loader: Factory<[Framework], Loader.Interface>

  /**
   * Options
   *
   * @public
   */
  options: Options

  /**
   * Set loader
   *
   * @param factory - {@link Loader.Factory}
   * @returns void
   *
   * @public
   */
  setLoader(factory: Maybe<[Framework], Loader.Interface>): void

  /**
   * Set options
   *
   * @param factory - {@link OptionsFactory}
   * @returns void
   *
   * @public
   */
  setOptions(factory: Maybe<[Framework], Options>): void

  /**
   * Merge option
   *
   * @param options - Options to merge
   * @param app - {@link Framework}
   * @returns void
   *
   * @public
   */
  mergeOptions(options: Options, app: Framework): void

  /**
   * Makes final Item output
   *
   * @param app - {@link Framework}
   * @returns finalized Item
   *
   * @public
   */
  make(app: Framework): Output
}
