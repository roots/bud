import {Handler, Application as Express} from 'express'
import {Compiler} from 'webpack'
import Dev from '@roots/bud-server'
export declare class Server implements Dev.Server {
  instance: Dev.Server.Instance
  config: Dev.Server.Config
  compiler: Compiler
  constructor(compiler?: Compiler, config?: Dev.Server.Config)
  getServer(): this['instance']
  setServer(instance: Express): this
  getConfig(): this['config']
  setConfig(config: Dev.Server.Config): this
  getCompiler(): Compiler
  setCompiler(compiler: Compiler): this
  addMiddleware(middleware: Handler): this
  addDevMiddleware(): this
  addHotMiddleware(): this
  addProxyMiddleware(): this
  listen(): void
}
//# sourceMappingURL=index.d.ts.map
