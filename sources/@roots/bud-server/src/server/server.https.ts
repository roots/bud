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
   * Has options
   * @returns boolean
   * @public
   * @decorator `@bind`
   */
  @bind
  public hasOptions(): boolean {
    return Object.keys(this.options).length > 0
  }

  /**
   * Has SSL key
   * @public
   */
  @bind
  public hasKey(): boolean {
    return this.hasOptions() && !isUndefined(this.options.key)
  }

  /**
   * Has SSL certificate
   * @public
   */
  @bind
  public hasCert(): boolean {
    return this.hasOptions() && !isUndefined(this.options.cert)
  }

  /**
   * Get SSL key
   * @returns
   */
  @bind
  public async getKey(): Promise<Server.Connection.Options['key']> {
    if (!this.hasKey()) {
      this.app.warn('Server key is not defined')
      return
    }

    try {
      return await readFile(this.options.key as string, 'utf8')
    } catch (err) {
      this.app.error(err)
    }
  }

  /**
   * Get SSL certificate
   * @public
   * @decorator `@bind`
   */
  @bind
  public async getCert(): Promise<Server.Connection.Options['cert']> {
    if (!this.hasKey()) {
      this.app.warn('Server key is not defined')
      return
    }

    try {
      return await readFile(this.options.cert as string, 'utf8')
    } catch (err) {
      this.app.error(err)
    }
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

    const key = await this.getKey()
    const cert = await this.getCert()
    const options = {...this.options, ...({key} ?? {}), ...({cert} ?? {})}

    this.instance = createServer(options, express)
    return this.instance
  }
}
