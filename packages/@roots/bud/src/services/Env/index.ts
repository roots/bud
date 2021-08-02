/**
 * @module Bud.Env
 */

import {Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import * as env from 'dotenv'
import * as expand from 'dotenv-expand'

/**
 * Service: Env
 *
 * @noInheritDoc
 */
class Env extends Service<{[key: string]: any}> {
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
  public getParsedEnv(): {[key: string]: any} {
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

export {Env}
