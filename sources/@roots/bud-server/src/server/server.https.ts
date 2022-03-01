import {Server} from '@roots/bud-framework'
import {fs} from '@roots/bud-support'
import {createServer, Server as HttpsServer} from 'https'

import {BaseServer} from './server.base'

const {readFile} = fs

/**
 * HTTP Server
 *
 * @public
 */
export class Https
  extends BaseServer<HttpsServer>
  implements Server.Connection.Https
{
  /**
   * Server instance
   *
   * @public
   */
  public instance: HttpsServer

  /**
   * Port
   *
   * @public
   */
  public get port() {
    return `${this.app.hooks.filter('dev.ssl.port', 443)}`
  }

  /**
   * Hostname
   *
   * @remarks
   * - default `localhost`
   *
   * @public
   */
  public get hostname(): string {
    const url = this.app.hooks.filter(`dev.url`)
    return url?.hostname ?? `localhost`
  }

  /**
   * SSL enabled
   *
   * @public
   */
  public isEnabled(): boolean {
    return this.app.hooks.filter('dev.ssl.enabled') === true
  }

  /**
   * Has SSL key
   *
   * @public
   */
  public hasKey(): boolean {
    return this.app.hooks.filter('dev.ssl.key') ? true : false
  }

  /**
   * Get SSL key
   *
   * @returns
   */
  public async getKey(): Promise<string> {
    !this.hasKey() && this.app.error('Server key is not defined')
    return await readFile(this.app.hooks.filter('dev.ssl.key'), 'utf8')
  }

  /**
   * Has SSL certificate
   *
   * @public
   */
  public hasCert(): boolean {
    return this.app.hooks.filter('dev.ssl.cert') ? true : false
  }

  /**
   * Get SSL certificate
   *
   * @public
   */
  public async getCert(): Promise<string> {
    !this.hasCert() && this.app.error('Server cert is not defined')
    return await readFile(this.app.hooks.filter('dev.ssl.cert'), 'utf8')
  }

  /**
   * Create HTTPS server
   *
   * @public
   */
  public async createServer(app: any): Promise<HttpsServer> {
    const key = await this.getKey()
    const cert = await this.getCert()

    this.instance = createServer({key, cert}, app)

    return this.instance
  }
}
