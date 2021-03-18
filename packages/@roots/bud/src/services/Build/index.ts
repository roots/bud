import {Build as Base} from '@roots/bud-build'
import * as builders from './builders'

/**
 * Framework/Build
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export class Build extends Base {
  /**
   * Service name
   */
  public name = 'service/build'

  /**
   * Service container
   */
  public repository = builders
}
