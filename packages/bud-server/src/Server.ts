import ServerInterface, {ServerOptions} from './'

import dev from './middleware/dev'
import hot from './middleware/hot'
import proxy from './middleware/proxy'

import express, {
  Application as Express,
  Handler as ExpressHandler,
} from 'express'

class Server implements ServerInterface {
  public server: Express
  public config: ServerOptions['config']
  public compiler: ServerOptions['compiler']

  public constructor({compiler, config}: ServerOptions) {
    this.compiler = compiler
    this.config = config

    this.server = express()

    this.server.set('x-powered-by', false)

    this.addMiddleware = this.addMiddleware.bind(this)
    this.addDevMiddleware = this.addDevMiddleware.bind(this)
    this.addHotMiddleware = this.addHotMiddleware.bind(this)
    this.addProxyMiddleware = this.addProxyMiddleware.bind(this)
  }

  public addMiddleware(middleware: ExpressHandler): void {
    this.server.use(middleware)
  }

  public addDevMiddleware(): void {
    this.addMiddleware(
      dev({
        compiler: this.compiler,
        config: this.config,
      }),
    )
  }

  public addHotMiddleware(): void {
    this.addMiddleware(hot(this.compiler))
  }

  public addProxyMiddleware(): void {
    this.addMiddleware(proxy(this.config))
  }

  public listen(): void {
    this.server.listen(
      this.config.port ?? 3000,
      this.config.host ?? 'localhost',
    )
  }
}

export {Server as default}
