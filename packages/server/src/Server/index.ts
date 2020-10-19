import * as middleware from '../middleware'
import express, {Handler} from 'express'
import * as config from './config'
import {injectClient} from './injectClient'

export class Server {
  public bud: Framework.Bud

  public instance: Framework.Server.Instance = express()

  public config: Framework.Server.Config = config

  public middleware: any

  public constructor(bud: Framework.Bud) {
    this.bud = bud

    this.instance.set('x-powered-by', false)

    this.setConfig = this.setConfig.bind(this)
    this.addMiddleware = this.addMiddleware.bind(this)
    this.addDevMiddleware = this.addDevMiddleware.bind(this)
    this.addHotMiddleware = this.addHotMiddleware.bind(this)
    this.addProxyMiddleware = this.addProxyMiddleware.bind(this)
  }

  public getInstance(): this['instance'] {
    return this.instance
  }

  public getConfig(): this['config'] {
    return this.config
  }

  public setConfig(config: Framework.Server.Config): this {
    this.config = config

    return this
  }

  public addMiddleware(middleware: Handler): this {
    this.instance.use(middleware)

    return this
  }

  public addDevMiddleware(): this {
    this.instance.use(
      middleware.dev({
        compiler: this.bud.compiler.getCompilation(),
        config: this.config,
      }),
    )

    return this
  }

  public addHotMiddleware(): this {
    this.bud.build.config.set(
      'entry',
      injectClient({
        entrypoints: this.bud.build.config.get('entry'),
      }),
    )

    this.addMiddleware(
      middleware.hot(this.bud.compiler.getCompilation()),
    )

    return this
  }

  public addProxyMiddleware(): this {
    this.addMiddleware(middleware.proxy(this.config))

    return this
  }

  public listen(): void {
    this.instance.listen(this.config?.port ?? 3000)
  }
}
