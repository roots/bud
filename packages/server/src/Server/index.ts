import * as middleware from '../middleware'
import express, {Handler} from 'express'
import * as config from './config'

export class Server {
  public bud: Framework.Bud

  public instance: Server.Instance = express()

  public config: Server.Config = config

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

  public getServer(): this['instance'] {
    return this.instance
  }

  public getConfig(): this['config'] {
    return this.config
  }

  public setConfig(config: Server.Config): this {
    this.config = config

    return this
  }

  public addMiddleware(middleware: Handler): this {
    this.instance.use(middleware)

    return this
  }

  public addDevMiddleware(): this {
    this.addMiddleware(
      middleware.dev({
        compiler: this.bud.compiler.getCompiler(),
        config: this.config,
      }),
    )

    return this
  }

  public addHotMiddleware(): this {
    this.addMiddleware(
      middleware.hot(this.bud.compiler.getCompiler()),
    )

    return this
  }

  public addProxyMiddleware(): this {
    this.addMiddleware(middleware.proxy(this.config))

    return this
  }

  public listen(): void {
    this.instance.listen(
      this.config?.port ?? 3000,
      this.config?.host ?? 'localhost',
    )
  }
}
