import type {Framework} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import * as env from 'dotenv'
import * as expand from 'dotenv-expand'

/**
 * @sealed
 */
class Env extends Service<Framework.Index<any>> {
  /** {@inheritDoc Service.name} */
  public name = 'env'

  /**
   * Returns path to .env file
   *
   * @readonly
   */
  public get envPath(): string {
    return this.app.path('project', '.env')
  }

  /**
   * get parsed .env hashmap
   */
  @bind
  public getParsedEnv(): Framework.Index<any> {
    return env?.config
      ? expand(env.config({path: this.envPath})).parsed
      : {}
  }

  /** {@inheritDoc Service.bootstrap} */
  public bootstrap() {
    this.setStore(this.getParsedEnv())
  }
}

export {Env}
