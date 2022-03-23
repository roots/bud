import {Server} from '@roots/bud-framework'
import {RequestListener} from 'http'
import {createServer, Server as HttpsServer} from 'https'

import {BaseServer} from './server.base'

/**
 * HTTPS Server
 * @public
 */
export class Https
  extends BaseServer<HttpsServer>
  implements Server.Connection.Https
{
  /**
   * Server instance
   * @public
   */
  public instance: HttpsServer

  /**
   * Create HTTPS server
   * @public
   */
  public createServer = async function (
    express: RequestListener & Express.Application,
  ): Promise<HttpsServer> {
    const key = await this.getKey()
    const cert = await this.getCert()

    return (this.instance = createServer(
      {...this.options, key, cert},
      express,
    ))
  }
}
