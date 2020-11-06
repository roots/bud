import * as middleware from '../middleware'
import express, {Handler} from 'express'
import * as config from './config'
import {injectClient} from './injectClient'
import {lodash as _} from '@roots/bud-support'
import {Webpack} from '@roots/bud-typings'

export class Server {
  public bud: Framework.Bud

  public instance: Framework.Server.Instance = express()

  public config: Framework.Server.Config = config

  public constructor({bud}: Framework.Bud) {
    this.setConfig = this.setConfig.bind(this)
    this.addMiddleware = this.addMiddleware.bind(this)
    this.addDevMiddleware = this.addDevMiddleware.bind(this)
    this.addHotMiddleware = this.addHotMiddleware.bind(this)
    this.addProxyMiddleware = this.addProxyMiddleware.bind(this)

    this.bud = bud
    this.instance = express()
    this.instance.set('x-powered-by', false)
  }

  public getInstance(): Framework.Server.Instance {
    return this.instance
  }

  public getConfig(): Framework.Server.Config {
    return this.config
  }

  public getConfigItem(
    key: string,
  ): Partial<Framework.Server.Config> {
    return this.config[key]
  }

  public setConfig(config: Framework.Server.Config): this {
    this.config = config

    return this
  }

  public mergeConfigItem(
    key: string,
    value: Partial<Framework.Server.Config>,
  ): void {
    this.config[key] = {
      ...this.getConfigItem(key),
      ...value,
    }
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
    this.bud.build.config.mutate(
      'entry',
      (entry: Webpack.Entry) => injectClient(entry),
    )
    this.bud.compiler.compile()

    this.instance.use(
      middleware.dev({
        compiler: this.bud.compiler.getCompilation(),
        config: this.config,
      }),
    )

    this.instance.use(
      middleware.hot(this.bud.compiler.getCompilation()),
    )

    this.bud.features.enabled('proxy') &&
      this.instance.use(middleware.proxy(this.config))

    this.listen()

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
