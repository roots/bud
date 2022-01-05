import {Framework} from '@roots/bud-framework'
import {readFile} from 'fs-extra'
import {createServer, Server} from 'https'

export class Https {
  public instance: Server

  public isEnabled(): boolean {
    return this.app.store.is('server.ssl.enabled', true)
  }

  public hasKey(): boolean {
    return this.app.store.isNotNull('server.ssl.key')
  }

  public async getKey(): Promise<string> {
    if (!this.hasKey()) {
      this.app.error('Server key is not defined')
      throw new Error('Server key is not defined')
    }

    return await readFile(
      this.app.store.get('server.ssl.key'),
      'utf8',
    )
  }

  public hasCert(): boolean {
    return this.app.store.isNotNull('server.ssl.cert')
  }

  public async getCert(): Promise<string> {
    if (!this.hasCert()) {
      this.app.error('Server cert is not defined')
      throw new Error('Server cert is not defined')
    }

    return await readFile(
      this.app.store.get('server.ssl.cert'),
      'utf8',
    )
  }

  public get port(): string {
    return this.app.store.has('server.ssl.port')
      ? this.app.store.get('server.ssl.port')
      : '443'
  }

  public constructor(public app: Framework) {}

  public async createServer(app: any): Promise<Server> {
    const key = await this.getKey()
    const cert = await this.getCert()

    this.instance = createServer({key, cert}, app)

    return this.instance
  }
}
