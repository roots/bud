import Service from './Service'
import express from 'express'

import * as middleware from '../middleware'
import {injectClient} from '../util/injectClient'

import type {Framework, Server} from '@roots/bud-typings'

/**
 * ## bud.server
 *
 * Express development server.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-server)
 * [🔗 Documentation](#)
 */
export default class extends Service implements Server {
  public register(): void {
    this.run = this.run.bind(this)

    this.instance = express()

    this.app.when(
      this.app.store.has('args.proxy'),
      ({store}: Framework) => store.enable('features.proxy'),
    )
  }

  public injectHmr(): void {
    this.app.store.set(
      'webpack.entry',
      injectClient(this.app.store),
    )
  }

  public run(compiler: Framework.Webpack.Compiler): this {
    const config = this.config

    this.instance.use(
      middleware.dev({
        config,
        compiler,
      }),
    )

    this.instance.use(middleware.hot(compiler))

    this.app.store.enabled('features.proxy') &&
      this.instance.use(middleware.proxy(this.config))

    this.instance.listen(
      this.config.get('port'),
      this.config.get('host'),
    )

    return this
  }
}
