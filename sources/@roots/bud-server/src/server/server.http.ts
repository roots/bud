import {Server} from '@roots/bud-framework'
import {createServer, RequestListener, Server as HttpServer} from 'http'

import {BaseServer} from './server.base'

/**
 * HTTP Server
 *
 * @public
 */
export class Http
  extends BaseServer<HttpServer>
  implements Server.Connection.Http
{
  /**
   * createServer
   *
   * @param app - Express application
   * @returns http.Server
   */
  public createServer = function (
    express: RequestListener,
  ): Promise<HttpServer> {
    this.instance = createServer(this.options, express)
    return this.instance
  }
}
