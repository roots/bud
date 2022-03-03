import {Server} from '@roots/bud-framework'
import {createServer, Server as HttpServer} from 'http'

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
    app: Express.Application,
  ): Promise<HttpServer> {
    this.instance = createServer(app)
    return this.instance
  }
}
