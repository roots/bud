import type {RequestListener, Server as HttpServer} from 'node:http'
import {createServer} from 'node:http'

import type {Connection} from '@roots/bud-framework/services/server'
import {BaseServer} from '@roots/bud-server/server/base'
import {bind} from '@roots/bud-support/decorators/bind'

/**
 * HTTP Server
 */
export class Server extends BaseServer implements Connection {
  /**
   * Server instance
   */
  public declare instance: HttpServer

  /**
   * createServer
   *
   * @param express - Express application
   * @returns server - {@link HttpServer}
   */
  @bind
  public async createServer(
    express: RequestListener,
  ): Promise<HttpServer> {
    this.instance = createServer(this.options, express)
    return this.instance
  }
}
