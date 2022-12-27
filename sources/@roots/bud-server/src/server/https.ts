import type {RequestListener} from 'node:http'
import {createServer, Server as HttpsServer} from 'node:https'

import type {Server} from '@roots/bud-framework/services'
import {BaseServer} from '@roots/bud-server/server/base'
import {bind} from '@roots/bud-support/decorators'

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
