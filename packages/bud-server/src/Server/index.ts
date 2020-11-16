import * as middleware from '../middleware'
import {injectClient} from './injectClient'
import express, {Express} from 'express'
import type Webpack from 'webpack'
import Framework from '@roots/bud-typings'

export {Server, Server as default}

class Server implements Framework.Server.Contract {
  public bud: Framework.Bud.Contract

  public instance: Framework.Server.Instance

  public constructor(bud: Framework.Bud.Contract) {
    this.bud = bud
    this.instance = express()
    this.instance.set('x-powered-by', false)
  }

  public run(callback?: Express.Handler): this {
    this.bud.compiler.compile()
    this.bud.config.mutate('entry', (entry: Webpack.Entry) =>
      injectClient(entry),
    )

    this.instance.use(
      middleware.dev({
        compiler: this.bud.compiler.get(),
        config: this.bud.serverConfig.getStore(),
      }),
    )

    this.instance.use(middleware.hot(this.bud.compiler.get()))

    this.bud.features.enabled('proxy') &&
      this.instance.use(
        middleware.proxy(this.bud.serverConfig.getStore()),
      )

    this.listen(callback)

    return this
  }

  public listen(callback: CallableFunction): void {
    this.instance.listen(
      this.bud.serverConfig.has('port')
        ? this.bud.serverConfig.get('port')
        : 3000,
      this.bud.serverConfig.has('host')
        ? this.bud.serverConfig.get('host')
        : 'localhost',
      callback ??
        function () {
          return null
        },
    )
  }
}
