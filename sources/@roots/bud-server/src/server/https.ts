import type {Connection} from '@roots/bud-framework/services/server'
import type {RequestListener} from 'node:http'

import {BaseServer} from '@roots/bud-server/server/base'
import {bind} from '@roots/bud-support/decorators/bind'
import {createServer, Server as HttpsServer} from 'node:https'

/**
 * HTTPS Server
 */
export class Server extends BaseServer implements Connection {
  /**
   * Server instance
   */
  public declare instance: HttpsServer

  /**
   * createServer
   */
  @bind
  public async createServer(
    express: RequestListener & Express.Application,
  ): Promise<HttpsServer> {
    this.instance = createServer(this.options, express)
    return this.instance
  }
}
