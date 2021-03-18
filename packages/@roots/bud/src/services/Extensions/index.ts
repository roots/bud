import {Extensions as Base} from '@roots/bud-extensions'
import {extensions} from '../../extensions'

/**
 * Extensions controller.
 *
 * Extensions controller for the Bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export class Extensions extends Base {
  /**
   * Service name
   */
  public name = 'service/extensions'

  /**
   * Service container
   */
  public repository = extensions
}
