import * as middleware from '../middleware'
import {injectClient} from './injectClient'
import express, {Express} from 'express'
import type Webpack from 'webpack'
import Framework from '@roots/bud-typings'

export {Server, Server as default}

class Server implements Framework.Server.Contract {
  public bud: Framework.Bud.Contract

  public instance: Framework.Server.Instance = express()

  public config: Framework.Container

  public constructor(bud: Framework.Bud.Contract) {
    this.addMiddleware = this.addMiddleware.bind(this)
    this.addDevMiddleware = this.addDevMiddleware.bind(this)
    this.addHotMiddleware = this.addHotMiddleware.bind(this)
    this.addProxyMiddleware = this.addProxyMiddleware.bind(this)

    this.bud = bud
    this.instance = express()
    this.instance.set('x-powered-by', false)
    this.config = this.bud.serverConfig
  }

  public getInstance(): Framework.Server.Instance {
    return this.instance
  }

  public addMiddleware(middleware: Express.Handler): this {
    this.instance.use(middleware)

    return this
  }

  public addDevMiddleware(): this {
    this.instance.use(
      middleware.dev({
        compiler: this.bud.compiler.get(),
        config: this.config.all(),
      }),
    )

    return this
  }

  public addHotMiddleware(): this {
    this.bud.config.mutate('entry', (entry: Webpack.Entry) =>
      injectClient(entry),
    )
    this.bud.compiler.compile()

    this.instance.use(
      middleware.dev({
        compiler: this.bud.compiler.get(),
        config: this.config.all(),
      }),
    )

    this.instance.use(middleware.hot(this.bud.compiler.get()))

    this.bud.features.enabled('proxy') &&
      this.instance.use(middleware.proxy(this.config.all()))

    this.listen()

    return this
  }

  public addProxyMiddleware(): this {
    this.addMiddleware(middleware.proxy(this.config.all()))

    return this
  }

  public listen(): void {
    this.instance.listen(
      this.config.has('port') ? this.config.get('port') : 3000,
      this.config.has('host')
        ? this.config.get('host')
        : 'localhost',
    )
  }
}
