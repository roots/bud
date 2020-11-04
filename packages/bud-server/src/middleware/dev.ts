import middleware from 'webpack-dev-middleware'

export interface DevFactoryOptions {
  compiler: Framework.Webpack.Compiler
  config: Framework.Server.Config
}

const BUD_HEADERS = {
  'X-Server': '@roots/bud',
}

const dev = ({
  compiler,
  config,
}: DevFactoryOptions): Framework.Express.RequestHandler =>
  middleware(compiler, options(config))

const options = (
  config: Framework.Server.Config,
): middleware.Options => {
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
