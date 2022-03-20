import {Server} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'
import {createServer, Server as HttpsServer} from 'https'

import {BaseServer} from './server.base'

const {readFile} = fs

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
   * Has SSL key
   * @public
   */
  public hasKey(): boolean {
    return this.app.hooks.filter('dev.ssl.key') ? true : false
  }

  /**
   * Get SSL key
   * @returns
   */
  public async getKey(): Promise<string> {
    !this.hasKey() && this.app.error('Server key is not defined')
    return await readFile(this.app.hooks.filter('dev.ssl.key'), 'utf8')
  }

  /**
   * Has SSL certificate
   * @public
   */
  public hasCert(): boolean {
    return this.app.hooks.filter('dev.ssl.cert') ? true : false
  }

  /**
   * Get SSL certificate
   * @public
   */
  public async getCert(): Promise<string> {
    !this.hasCert() && this.app.error('Server cert is not defined')
    return await readFile(this.app.hooks.filter('dev.ssl.cert'), 'utf8')
  }

  /**
   * Create HTTPS server
   * @public
   */
  public createServer = async function (app: any): Promise<HttpsServer> {
    const key = await this.getKey()
    const cert = await this.getCert()

    this.instance = createServer({key, cert}, app)

    return this.instance
  }
}
