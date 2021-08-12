import {
  Framework,
  Server as Contract,
} from '@roots/bud-framework'
import {Server as Base} from '@roots/bud-server'
import * as express from 'express'

/**
 * @sealed
 */
export class Server extends Base implements Contract {
  public register({container, store}: Framework): void {
    this.instance = express()
    this.config = container(store.get('server'))
  }
}
