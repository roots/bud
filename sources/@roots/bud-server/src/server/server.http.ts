import {Server} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {createServer, RequestListener, Server as HttpServer} from 'http'

import {BaseServer} from './server.base'

/**
 * HTTP Server
 * @public
 */
export class Http extends BaseServer implements Server.Connection.Http {
  /**
   * createServer
   *
   * @param express - Express application
   * @returns http.Server
   * @public
   * @decorator `@bind`
   */
  @bind
  public async createServer(
    express: RequestListener,
  ): Promise<HttpServer> {
    this.instance = createServer(express)
    return this.instance
  }
}
