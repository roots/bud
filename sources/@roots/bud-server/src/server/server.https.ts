import {Server} from '@roots/bud-framework'
import {bind, fs, lodash} from '@roots/bud-support'
import {RequestListener} from 'http'
import {createServer, Server as HttpsServer} from 'https'

import {BaseServer} from './server.base'

const {readFile} = fs
const {isUndefined} = lodash

/**
 * HTTPS Server
 * @public
 */
export class Https extends BaseServer implements Server.Connection.Https {
  /**
   * Server instance
   * @public
   */
  public instance: HttpsServer

  /**
   * Has SSL key
   * @public
   */
  @bind
  public hasKey(): boolean {
    return !isUndefined(this.options.key)
  }

  /**
   * Has SSL certificate
   * @public
   */
  @bind
  public hasCert(): boolean {
    return !isUndefined(this.options.cert)
  }

  /**
   * Get SSL key
   * @returns
   */
  @bind
  public async getKey(): Promise<Server.Connection.Options['key']> {
    !this.hasKey() && this.app.warn('Server key is not defined')
    return await readFile(this.options.key as string, 'utf8')
  }

  /**
   * Get SSL certificate
   * @public
   * @decorator `@bind`
   */
  @bind
  public async getCert(): Promise<Server.Connection.Options['cert']> {
    !this.hasCert() && this.app.warn('Server cert is not defined')
    return await readFile(this.options.cert as string, 'utf8')
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
    const key = await this.getKey()
    const cert = await this.getCert()

    this.instance = createServer({...this.options, key, cert}, express)

    return this.instance
  }
}
