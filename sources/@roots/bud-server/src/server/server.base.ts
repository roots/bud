import {Framework} from '@roots/bud-framework'
import {getPort} from '@roots/bud-support'
import {Server as HttpServer} from 'http'
import {Server as HttpsServer} from 'https'

/**
 * HTTP Server
 *
 * @public
 */
export abstract class BaseServer<T> {
  /**
   * Server instance
   *
   * @public
   */
  public instance: T & (HttpServer | HttpsServer)

  /**
   * Dev URL
   *
   * @public
   */
  public get devUrl() {
    return this.app.hooks.filter(`dev.url`)
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
    return this.devUrl?.hostname ?? `localhost`
  }

  /**
   * Port
   *
   * @remarks
   * - default `80`
   *
   * @public
   */
  public get port(): string {
    return this.devUrl?.port ?? `3000`
  }

  /**
   * Constructor
   *
   * @param app - Framework
   */
  public constructor(public app: Framework) {}

  /**
   * Server listen event
   *
   * @public
   */
  public async listen() {
    const port = await getPort({port: Number(this.port)})

    this.instance.listen(port, this.hostname, () =>
      this.app.hooks.fire('event.server.listen'),
    )
    this.instance.on('error', err => err && this.app.error(err))
  }
}
