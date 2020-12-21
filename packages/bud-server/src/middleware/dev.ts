import {webpackDevMiddleware} from '@roots/bud-support'
import {Express, Webpack, Server} from '@roots/bud-typings'

export interface DevFactoryOptions {
  compiler: Webpack.Compiler
  config: Server.Config
}

/**
 * Ident header
 */
const BUD_HEADERS = {
  'X-Server': '@roots/bud',
}

/**
 * Make dev middleware
 */
const dev = ({
  compiler,
  config,
}: DevFactoryOptions): Express.RequestHandler =>
  webpackDevMiddleware(compiler, options(config))

/**
 * Make dev middlware options
 */
const options = (
  config: Server.Config,
): webpackDevMiddleware.Options => {
  return {
    publicPath: '/',
    headers: BUD_HEADERS,
    logLevel: 'silent',
    methods: config.methods ?? ['GET', 'HEAD'],
    mimeTypes: config.mimeTypes ?? undefined,
    serverSideRender: config.serverSideRender ?? false,
    index: config.index ?? 'index.html',
    watchOptions: config.watchOptions,
    writeToDisk: config.writeToDisk ?? true,
  }
}

export {dev}
