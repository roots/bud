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
  publicPath: config.publicPath,
  filename: config.filename,
  headers: {...config.headers, ...PROXY_MSG} ?? PROXY_MSG,
  lazy: config.lazy,
  logLevel: config.logLevel,
  logTime: config.logTime,
  methods: config.methods,
  mimeTypes: config.mimeTypes,
  serverSideRender: config.serverSideRender,
  stats: config.stats,
  watchOptions: config.watchOptions,
  writeToDisk: config.writeToDisk,
})

export {dev as default}
