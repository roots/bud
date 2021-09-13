import {
  Factory,
  Framework,
  Loader,
  Maybe,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'

/**
 * Framework Loader
 *
 * @public
 */
export default class
  extends Loader.Abstract
  implements Loader.Interface
{
  /**
   * {@link @roots/bud-framework#Factory | Factory} returning the loader path
   */
  public src: Factory<[Framework], string>

  /**
   * Class constructor
   *
   * @param src - Either a factory returning a string or a literal string
   *
   * @public
   */
  public constructor(src: Maybe<[Framework], string>) {
    super()

    this.src = this.normalizeInput<string>(src)
  }

  /**
   * {@link @roots/bud-framework#Factory | Factory} producing the final loader path
   *
   * @param app - {@link @roots/bud-framework#Framework}
   * @returns final loader path
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public make(app: Framework): string {
    return this.src(app)
  }

  /**
   * Ensure that a userInput is assigned to the class as a {@link @roots/bud-framework#Factory | Factory}
   *
   * @param input - input value
   * @returns normalized value from user input
   *
   * @public
   */
  public normalizeInput<T = any>(
    input: Maybe<[Framework], T>,
  ): Factory<[Framework], T> {
    return isFunction(input) ? input : () => input
  }
}
