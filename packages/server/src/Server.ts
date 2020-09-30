import {ServerInterface} from './'
import dev from './middleware/dev'
import hot from './middleware/hot'
import proxy from './middleware/proxy'
import express, {Handler} from 'express'

class Server implements ServerInterface {
  public instance: ServerInterface['instance']
  public config: ServerInterface['config']
  public compiler: ServerInterface['compiler']

  public constructor(
    compiler?: ServerInterface['compiler'],
    config?: ServerInterface['config'],
  ) {
    this.instance = express()
    this.instance.set('x-powered-by', false)

    if (compiler) {
      this.compiler = compiler
    }

    if (config) {
      this.config = config
    }

    this.addMiddleware = this.addMiddleware.bind(this)
    this.addDevMiddleware = this.addDevMiddleware.bind(this)
    this.addHotMiddleware = this.addHotMiddleware.bind(this)
    this.addProxyMiddleware = this.addProxyMiddleware.bind(this)

    this.setConfig = this.setConfig.bind(this)
    this.setCompiler = this.setCompiler.bind(this)
    this.setServer = this.setServer.bind(this)
  }

  public getServer: ServerInterface['getServer'] = function (): ServerInterface['instance'] {
    return this.instance
  }

  public setServer: ServerInterface['setServer'] = function (
    instance: ServerInterface['instance'],
  ): ServerInterface {
    this.instance = instance

    return this
  }

  public getConfig: ServerInterface['getConfig'] = function (): ServerInterface['config'] {
    return this.config
  }

  public setConfig: ServerInterface['setConfig'] = function (
    config: ServerInterface['config'],
  ): ServerInterface {
    this.config = config

    return this
  }

  public getCompiler: ServerInterface['getCompiler'] = function (): ServerInterface['compiler'] {
    return this.compiler
  }

  public setCompiler: ServerInterface['setCompiler'] = function (
    compiler: ServerInterface['compiler'],
  ): ServerInterface {
    this.compiler = compiler

    return this
  }

  public addMiddleware: ServerInterface['addMiddleware'] = function (
    middleware: Handler,
  ): ServerInterface {
    this.instance.use(middleware)

    return this
  }

  public addDevMiddleware: ServerInterface['addDevMiddleware'] = function (): ServerInterface {
    this.addMiddleware(
      dev({
        compiler: this.compiler,
        config: this.config,
      }),
    )

    return this
  }

  public addHotMiddleware: ServerInterface['addHotMiddleware'] = function (): ServerInterface {
    this.addMiddleware(hot(this.compiler))

    return this
  }

  public addProxyMiddleware: ServerInterface['addProxyMiddleware'] = function (): ServerInterface {
    this.addMiddleware(proxy(this.config))

    return this
  }

  public listen: ServerInterface['listen'] = function (): void {
    this.instance.listen(
      this.config?.port ?? 3000,
      this.config?.host ?? 'localhost',
    )
  }
}

export {Server as default}
