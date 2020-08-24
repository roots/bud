import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const makeMiddleware = (
  bud: any,
  setDevStats: (stats: any) => void,
): any[] => {
  const devMiddlewareOptions = {
    headers: bud.options.get('devServer.headers'),
    logger: bud.logger,
    loglevel: 'trace',
    publicPath: bud.paths.get('public'),
    writeToDisk: false,
    reload: false,
    reporter: (middlewareOptions, reporterOptions) => {
      reporterOptions?.stats &&
        setDevStats(
          reporterOptions.stats.toJson({
            version: true,
            hash: true,
            time: true,
            assets: true,
            errors: true,
            warnings: true,
            chunks: false,
            modules: false,
            entrypoints: false,
            assetsByChunkName: false,
            logging: false,
            children: false,
            namedChunkGroups: false,
          }),
        )
    },
  }

  bud.logger.info(
    {
      name: 'bud.compiler',
      devMiddlewareOptions,
    },
    'dev server middleware options',
  )

  const devMiddleware = webpackDevMiddleware(bud.compiler, {
    headers: bud.options.get('devServer.headers'),
    logger: bud.logger,
    publicPath: bud.paths.get('public'),
    writeToDisk: false,
    reporter: (middlewareOptions, reporterOptions) => {
      reporterOptions?.stats &&
        setDevStats(
          reporterOptions.stats.toJson({
            version: true,
            hash: true,
            assets: true,
            errors: true,
            warnings: true,
            chunks: false,
            modules: false,
            entrypoints: false,
            children: false,
          }),
        )
    },
  })

  const hotMiddleware = webpackHotMiddleware(bud.compiler, {
    heartbeat: 2000,
  })

  return [devMiddleware, hotMiddleware]
}

export {makeMiddleware}
