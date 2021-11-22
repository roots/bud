import {Factory, Framework, Maybe} from '../..'
import LoaderInterface from './Interface'

/**
 * Defines a webpack loader
 *
 * @public
 */
export default abstract class LoaderAbstract
  implements LoaderInterface
{
  /**
   * Loader src
   *
   * @public
   */
  public abstract src: Factory<[Framework], string>

  /**
   * Returns finalized Loader
   *
   * @param app - {@link @roots/bud-framework#Framework}
   * @returns loader path
   *
   * @public
   */
  public abstract make(app: Framework): string

  /**
   * Ensure that a value is a factory
   *
   * @param input - input value
   * @returns
   */
  public abstract normalizeInput<T = any>(
    input: Maybe<[Framework], T>,
  ): Factory<[Framework], T>
}
