import dev from '../middleware/dev'
import hot from '../middleware/hot'
import proxy from '../middleware/proxy'
import express, {Handler, Application as Express} from 'express'
import {Compiler} from 'webpack'
import * as config from './config'

export class Server {
  public instance: Server.Instance = express()

  public config: Server.Config = config

  public compiler: Compiler

  public constructor() {
    this.instance.set('x-powered-by', false)

    this.addMiddleware = this.addMiddleware.bind(this)
    this.addDevMiddleware = this.addDevMiddleware.bind(this)
    this.addHotMiddleware = this.addHotMiddleware.bind(this)
    this.addProxyMiddleware = this.addProxyMiddleware.bind(this)

    this.setConfig = this.setConfig.bind(this)
    this.setCompiler = this.setCompiler.bind(this)
    this.setServer = this.setServer.bind(this)
  }

  public getServer(): this['instance'] {
    return this.instance
  }

  public setServer(instance: Express): this {
    this.instance = instance

    return this
  }

  public getConfig(): this['config'] {
    return this.config
  }

  public setConfig(config: Server.Config): this {
    this.config = config

    return this
  }

  public getCompiler(): Compiler {
    return this.compiler
  }

  public setCompiler(compiler: Compiler): this {
    this.compiler = compiler

    return this
  }

  public addMiddleware(middleware: Handler): this {
    this.instance.use(middleware)

    return this
  }

  public addDevMiddleware(): this {
    this.addMiddleware(
      dev({
        compiler: this.compiler,
        config: this.config,
      }),
    )

    return this
  }

  public addHotMiddleware(): this {
    this.addMiddleware(hot(this.compiler))

    return this
  }

  public addProxyMiddleware(): this {
    this.addMiddleware(proxy(this.config))

    return this
  }

  public listen(): void {
    this.instance.listen(
      this.config?.port ?? 3000,
      this.config?.host ?? 'localhost',
    )
  }
}
