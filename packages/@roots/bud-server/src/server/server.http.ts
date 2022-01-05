import {Framework} from '@roots/bud-framework'
import {createServer, Server} from 'http'

export class Http {
  public instance: Server

  /**
   * Port
   *
   * @public
   */
  public get port(): string {
    const url = this.app.store.get('server.dev.url')
    return !url.port || url.port == '' ? '80' : url.port
  }

  /**
   * constructor
   *
   * @param app - Framework
   */
  public constructor(public app: Framework) {}

  /**
   * createServer
   *
   * @param app - Express application
   * @returns http.Server
   */
  public async createServer(
    app: Express.Application,
  ): Promise<Server> {
    this.instance = createServer(app)
    return this.instance
  }
}
