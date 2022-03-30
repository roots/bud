import {Server} from '@roots/bud-framework'
import {bind, fs} from '@roots/bud-support'
import {RequestListener} from 'http'
import {createServer, Server as HttpsServer} from 'https'

import {BaseServer} from './server.base'

const {readFile} = fs

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
    return typeof this.app.hooks.filter('dev.key') === 'string'
  }

  /**
   * Has SSL certificate
   * @public
   */
  @bind
  public hasCert(): boolean {
    return typeof this.app.hooks.filter('dev.cert') === 'string'
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
      return await readFile(this.app.hooks.filter('dev.key'), 'utf8')
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
      return await readFile(this.app.hooks.filter('dev.cert'), 'utf8')
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

    const options = this.options ?? {}
    if (key) options.key = key
    if (cert) options.cert = cert

    this.instance = createServer(options, express)
    return this.instance
  }
}
