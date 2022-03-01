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
   * Hostname
   *
   * @remarks
   * - default `localhost`
   *
   * @public
   */
  public get hostname(): string {
    return this.devUrl?.hostname ?? `localhost`
  }

  /**
   * Port
   *
   * @public
   */
  public get port(): string {
    return `${this.devUrl?.port ?? `3000`}`
  }

  /**
   * createServer
   *
   * @param app - Express application
   * @returns http.Server
   */
  public async createServer(
    app: Express.Application,
  ): Promise<HttpServer> {
    this.instance = createServer(app)
    return this.instance
  }
}
