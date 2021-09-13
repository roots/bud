import {Factory, Framework, Maybe} from '../..'

/**
 * Defines a webpack loader
 *
 * @public
 */
export default interface LoaderInterface {
  /**
   * Loader src factory
   *
   * @public
   */
  src: Factory<[Framework], string>

  /**
   * Returns finalized Loader
   *
   * @param app - {@link @roots/bud-framework#Framework}
   * @returns loader path
   *
   * @public
   */
  make(app: Framework): string

  /**
   * Ensure that a value is a factory
   *
   * @param input - input value
   * @returns
   */
  normalizeInput<T = any>(
    input: Maybe<[Framework], T>,
  ): Factory<[Framework], T>
}
