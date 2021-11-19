import * as Framework from '@roots/bud-framework'
import {Framework as Bud} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'
const {isFunction} = lodash

/**
 * Framework Loader
 *
 * @public
 */
export class Loader
  extends Framework.Loader.Abstract
  implements Framework.Loader.Interface
{
  /**
   * Factory returning the loader path
   *
   * @public
   */
  public src: Framework.Factory<[Bud], string>

  /**
   * Class constructor
   *
   * @param src - Either a factory returning a string or a literal string
   *
   * @public
   */
  public constructor(src: Framework.Maybe<[Bud], string>) {
    super()

    this.src = this.normalizeInput<string>(src)
  }

  /**
   * Factory producing the final loader path
   *
   * @param app - {@link @roots/bud-Bud#Bud}
   * @returns final loader path
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public make(app: Bud): string {
    return this.src(app)
  }

  /**
   * Ensure that a userInput is assigned to the class as a {@link @roots/bud-Bud#Factory | Factory}
   *
   * @param input - input value
   * @returns normalized value from user input
   *
   * @public
   */
  public normalizeInput<T = any>(
    input: Framework.Maybe<[Bud], T>,
  ): Framework.Factory<[Bud], T> {
    return isFunction(input) ? input : () => input
  }
}
