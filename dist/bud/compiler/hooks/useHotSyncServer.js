const {
  useState,
  useEffect
} = require('react');

const browserSync = require('browser-sync').create();

const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackHotMiddleware = require('webpack-hot-middleware');

const makeMiddleware = (compiler, bud, setDevStats) => {
  const devMiddlewareOptions = {
    headers: bud.options.get('dev').headers,
    logger: bud.logger,
    loglevel: 'trace',
    publicPath: bud.paths.get('public'),
    reporter: (middlewareOptions, reporterOptions) => {
      (reporterOptions === null || reporterOptions === void 0 ? void 0 : reporterOptions.stats) && setDevStats(reporterOptions.stats.toJson({
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
        namedChunkGroups: false
      }));
    },
    stats: {
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
      namedChunkGroups: false
    }
  };
  bud.logger.info({
    name: 'bud.compiler',
    options: devMiddlewareOptions
  }, 'making dev server middleware from options');
  const devMiddleware = webpackDevMiddleware(compiler, devMiddlewareOptions);
  const hotMiddleware = webpackHotMiddleware(compiler);
  return [devMiddleware, hotMiddleware];
};

const useHotSyncServer = (bud, compiler, callback) => {
  const [hot] = useState(bud.features.enabled('hot'));
  const [target] = useState(bud.options.get('dev').host);
  const [open] = useState(bud.options.get('dev').open);
  const [files] = useState(bud.options.get('watch'));
  const [hotSyncServer, setHotSyncServer] = useState(null);
  const [devStats, setDevStats] = useState(null);
  useEffect(() => {
    if (!hotSyncServer && hot) {
      const options = {
        hot,
        proxy: {
          target,
          ws: true
        },
        logLevel: 'silent',
        reloadOnRestart: true,
        open,
        middleware: makeMiddleware(compiler, bud, setDevStats),
        injectChanges: true,
        watchOptions: {
          ignoreInitial: true
        },
        files
      };
      setHotSyncServer(browserSync.init(options));
      bud.logger.info({
        name: 'bud.compiler',
        options,
        hot
      }, 'using browserSync as hot sync server');
    }
  }, [hotSyncServer, setHotSyncServer, hot, open, files, target]);
  useEffect(() => {
    hotSyncServer && bud.logger.info({
      name: 'bud.compiler'
    }, 'hot sync server initialized');
  }, [hotSyncServer]);
  return [hotSyncServer, devStats];
};

module.exports = {
  useHotSyncServer
};