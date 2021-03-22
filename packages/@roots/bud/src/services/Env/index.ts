import dotenv from 'dotenv'
import {Service} from '@roots/bud-framework'

/**
 * Framework/Env
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://git.io/Jkli3)
 */
export class Env extends Service {
  /**
   * Service name
   */
  public name = 'service/env'

  /**
   * Register
   */
  public registered() {
    this.setStore(
      dotenv.config({
        path: this.path.posix.join(
          this.app.subscribe('location/project'),
          '.env',
        ),
      }).parsed,
    )
  }
}
