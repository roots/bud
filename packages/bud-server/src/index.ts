import dev from './middleware/dev'
import hot from './middleware/hot'
import proxy from './middleware/proxy'

import devMiddleware from './middleware/dev'
import hotMiddleware from './middleware/hot'
import proxyMiddleware from './middleware/proxy'

import WebpackDevMiddleware from 'webpack-dev-middleware'
import {Options as ProxyOptions} from 'http-proxy-middleware'
import {Compiler} from 'webpack'
import express, {
  Application as Express,
  Handler as ExpressHandler,
} from 'express'

interface ServerConfig {
  host?: string
  port?: number
  from?: {
    host?: string
    port?: number
  }
  to?: {
    host?: string
    port?: number
  }
  index?: string
  hot?: boolean
  hotOnly?: boolean
  publicPath?: string
  ssl?: ProxyOptions['ssl']
  secure?: ProxyOptions['secure']
  ws?: ProxyOptions['ws']
  autoRewrite?: ProxyOptions['autoRewrite']
  changeOrigin?: ProxyOptions['changeOrigin']
  followRedirects?: ProxyOptions['followRedirects']
  filename?: WebpackDevMiddleware.Options['filename']
  headers?: WebpackDevMiddleware.Options['headers']
  lazy?: WebpackDevMiddleware.Options['lazy']
  logLevel?: WebpackDevMiddleware.Options['logLevel']
  logTime?: WebpackDevMiddleware.Options['logTime']
  methods?: WebpackDevMiddleware.Options['methods']
  mimeTypes?: WebpackDevMiddleware.Options['mimeTypes']
  serverSideRender?: WebpackDevMiddleware.Options['serverSideRender']
  stats?: WebpackDevMiddleware.Options['stats']
  watchOptions?: WebpackDevMiddleware.Options['watchOptions']
  writeToDisk?: WebpackDevMiddleware.Options['writeToDisk']
}

interface ServerOptions {
  config: ServerConfig
  compiler: Compiler
}

/**
 * Bud Server
 */
class Server {
  public server: Express = express()
  public config: ServerOptions['config']
  public compiler: ServerOptions['compiler']

  public constructor({compiler, config}: ServerOptions) {
    this.compiler = compiler
    this.config = config

    this.addDevMiddleware = this.addDevMiddleware.bind(this)
    this.addHotMiddleware = this.addHotMiddleware.bind(this)
    this.addProxyMiddleware = this.addProxyMiddleware.bind(this)
    this.addMiddleware = this.addMiddleware.bind(this)
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
    this.server.use(express.static('dist'))

    this.server.listen(
      this.config.to?.port ?? 3000,
      (this.config.to?.host as string) ??
        (this.config.host as string) ??
        'localhost',
    )
  }
}

export default Server
export {
  ServerConfig,
  ServerOptions,
  devMiddleware,
  hotMiddleware,
  proxyMiddleware,
}
