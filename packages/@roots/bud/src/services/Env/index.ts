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
   * Get the .env path
   */
  public get envPath(): string {
    return this.app.path('project', '.env')
  }

  /**
   * Config getter
   */
  @bind
  public getParsedEnv() {
    return dotenv.config({path: this.envPath}).parsed
  }

  /**
   * Lifecycle: all services registered
   */
  @bind
  public bootstrap() {
    this.setStore(this.getParsedEnv())
  }
}
