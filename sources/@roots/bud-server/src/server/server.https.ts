import {Server} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import {RequestListener} from 'http'
import {createServer, Server as HttpsServer} from 'https'

import {BaseServer} from './server.base.js'

/**
 * HTTPS Server
 * @public
 */
export class Https extends BaseServer implements Server.Connection {
  /**
   * Server instance
   * @public
   */
  public instance: HttpsServer

  /**
   * Https protocol
   * @public
   */
  public protocol: 'https:' = 'https:'

  /**
   * Has options
   * @returns boolean
   * @public
   * @decorator `@bind`
   */
  @bind
  public hasOptions(): boolean {
    return this.options && Object.keys(this.options).length > 0
  }

  /**
   * Create HTTPS server
   * @public
   * @decorator `@bind`
   */
  @bind
  public async createServer(
    express: RequestListener & Express.Application,
  ): Promise<HttpsServer> {
    if (!this.hasOptions()) {
      this.instance = createServer(express)
      return this.instance
    }

    this.instance = createServer(this.options, express)
    return this.instance
  }
}
