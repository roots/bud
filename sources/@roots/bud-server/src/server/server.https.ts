import type {Server} from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import type {RequestListener} from 'http'
import {createServer, Server as HttpsServer} from 'https'

import {BaseServer} from './server.base.js'

/**
 * HTTPS Server
 *
 * @public
 */
export class Https extends BaseServer implements Server.Connection {
  /**
   * Server instance
   *
   * @public
   */
  public override instance: HttpsServer

  /**
   * createServer
   *
   * @param express - Express application
   * @returns server - {@link HttpsServer}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async createServer(
    express: RequestListener & Express.Application,
  ): Promise<HttpsServer> {
    this.instance = createServer(this.options, express)
    return this.instance
  }
}
