/**
 * @module Bud.Server
 */

import {
  Framework,
  Server as Contract,
} from '@roots/bud-framework'
import {Server as Base} from '@roots/bud-server'
import {boundMethod as bind} from 'autobind-decorator'
import * as express from 'express'

/**
 * Service: Server
 *
 * @implements {Contract}
 * @extends {Base}
 */
export class Server extends Base implements Contract {
  /**
   * @method register
   */
  @bind
  public register({container, store}: Framework): void {
    this.instance = express()
    this.config = container(store.get('server'))
  }
}
