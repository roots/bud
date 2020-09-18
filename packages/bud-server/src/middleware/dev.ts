import WebpackDevMiddleware from 'webpack-dev-middleware'
import {Compiler} from 'webpack'
import {RequestHandler} from 'express'
import {ServerConfig} from '..'

export interface DevFactoryOptions {
  compiler: Compiler
  config: ServerConfig
}

const dev = ({
  compiler,
  config,
}: DevFactoryOptions): RequestHandler =>
  WebpackDevMiddleware(compiler, options(config))

const PROXY_MSG = {
  'X-Server': '@roots/bud',
}

const options = (
  config: ServerConfig,
): WebpackDevMiddleware.Options => ({
  publicPath: config.publicPath ?? '/',
  headers: {...config.headers, ...PROXY_MSG} ?? PROXY_MSG,
  lazy: config.lazy ?? false,
  logLevel: config.logLevel ?? 'silent',
  methods: config.methods ?? ['GET', 'HEAD'],
  mimeTypes: config.mimeTypes,
  serverSideRender: config.serverSideRender,
  stats: config.stats,
  index: config.index ?? 'index.html',
  watchOptions: config.watchOptions,
  writeToDisk: config.writeToDisk ?? true,
})

export {dev as default}
