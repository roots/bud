import WebpackDevMiddleware from 'webpack-dev-middleware'
import {Compiler} from 'webpack'
import {RequestHandler} from 'express'

export interface DevFactoryOptions {
  compiler: Compiler
  config: Framework.Server.Config
}

const BUD_HEADERS = {
  'X-Server': '@roots/bud',
}

const dev = ({
  compiler,
  config,
}: DevFactoryOptions): RequestHandler =>
  WebpackDevMiddleware(compiler, options(config))

const options = (
  config: Framework.Server.Config,
): WebpackDevMiddleware.Options => ({
  publicPath: config.publicPath ?? '/',
  headers: {...config.headers, ...BUD_HEADERS} ?? BUD_HEADERS,
  logLevel: 'silent',
  methods: config.methods ?? ['GET', 'HEAD'],
  mimeTypes: config.mimeTypes,
  serverSideRender: config.serverSideRender,
  index: config.index ?? 'index.html',
  watchOptions: config.watchOptions,
  writeToDisk: config.writeToDisk ?? true,
})

export {dev}
