/**
 * @module @roots/bud
 */

import {Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import * as env from 'dotenv'
import * as expand from 'dotenv-expand'

/**
 * @class Env
 */
class Env extends Service {
  /**
   * @property {string} name
   */
  public name = 'env'

  /**
   * @property {string} envPath
   * @readonly
   */
  public get envPath(): string {
    return this.app.path('project', '.env')
  }

  /**
   * @method getParsedEnv
   */
  @bind
  public getParsedEnv() {
    return env?.config
      ? expand(env.config({path: this.envPath})).parsed
      : {}
  }

  /**
   * @method bootstrap
   * {@link Service.bootstrap}
   */
  @bind
  public bootstrap() {
    this.setStore(this.getParsedEnv())
  }
}

/**
 * @exports Env
 */
export {Env}
