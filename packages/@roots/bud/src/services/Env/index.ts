import {Service} from '@roots/bud-framework'
import dotenv from 'dotenv'

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
   * Lifecycle: all services registered
   */
  public registered() {
    this.setStore(dotenv.config({path: this.envPath}).parsed)
  }

  /**
   * Get the .env path
   */
  public get envPath(): string {
    return this.path.posix.join(
      this.app.subscribe('location/project'),
      '.env',
    )
  }
}
