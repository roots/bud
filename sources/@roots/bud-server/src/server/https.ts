import type {Connection} from '@roots/bud-framework/services/server'

import type {RequestListener} from 'node:http'
import {createServer, Server as HttpsServer} from 'node:https'

import {BaseServer} from '@roots/bud-server/server/base'
import {bind} from '@roots/bud-support/decorators/bind'

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
