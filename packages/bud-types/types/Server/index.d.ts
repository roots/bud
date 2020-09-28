// Type definitions for Server
// Project: @roots/bud
// Definitions by: Kelly Mears <kelly@roots.io>

import Bud from '..'
import Webpack from 'webpack'
import {
  Application as Express,
  Handler as ExpressHandler,
} from 'express'

export default Server

declare class Server {
  /**
   * Express instance.
   */
  public instance: Express

  /**
   * Get Express instance.
   */
  public getServer: () => Server['instance']

  /**
   * Set Express instance.
   */
  public setServer: (server: Express) => Server

  /**
   * Server configuration.
   */
  public config: Bud.Server.Config

  /**
   * Get Express instance.
   */
  public getConfig: () => Bud.Server.Config

  /**
   * Set Express instance.
   */
  public setConfig: (config: Bud.Server.Config) => Server

  /**
   * Webpack compiler.
   */
  public compiler: Webpack.Compiler

  /**
   * Get compiler.
   */
  public getCompiler: () => Webpack.Compiler

  /**
   * Set compiler.
   */
  public setCompiler: (compiler: Webpack.Compiler) => Server

  /**
   * Add middleware to Express instance.
   */
  public addMiddleware: (middleware: ExpressHandler) => Server

  /**
   * Add dev middleware
   */
  public addDevMiddleware: () => Server

  /**
   * Add hot middleware
   */
  public addHotMiddleware: () => Server

  /**
   * Add dev middleware
   */
  public addProxyMiddleware: () => Server

  /**
   * Binds and listens for connections on the host and port specified in the config.
   */
  public listen: () => void
}
