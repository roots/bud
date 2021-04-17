import {Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
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
   * Config getter
   */
  get dotenv() {
    return dotenv.config({path: this.envPath})
  }

  /**
   * Lifecycle: all services registered
   */
  @bind
  public registered() {
    this.setStore(this.dotenv.parsed)
  }

  /**
   * Get the .env path
   */
  public get envPath(): string {
    return this.app.path('project', '.env')
  }
}
