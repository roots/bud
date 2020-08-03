const {
  useState,
  useEffect,
  useMemo
} = require('react');

const {
  ProgressPlugin
} = require('webpack');

const browserSync = require('browser-sync');

const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackHotMiddleware = require('webpack-hot-middleware');

const makeMiddleware = (compiler, bud) => [webpackDevMiddleware(compiler, {
  headers: bud.options.get('dev').headers,
  publicPath: bud.paths.get('public') || '/',
  stats: {
    version: true,
    hash: true,
    time: true,
    assets: true,
    errors: true,
    warnings: true
  }
}), webpackHotMiddleware(compiler, {
  log: msg => {
    bud.logger.info({
      name: 'bud.compiler',
      msg
    }, 'message via webpackHotMiddleware');
  }
})];

const hotSyncServer = (bud, compiler, callback) => {
  return browserSync.init({
    proxy: {
      target: bud.options.get('dev').host,
      ws: true
    },
    logLevel: 'silent',
    reloadOnRestart: true,
    injectFileTypes: ['js', 'css'],
    open: bud.options.get('dev').open,
    middleware: makeMiddleware(compiler, bud),
    injectChanges: true,
    watchOptions: {
      ignoreInitial: true
    },
    files: bud.options.get('watch')
  }, callback);
};
/**
 * useProgress: Webpack ProgressPlugin
 * @return {object}
 */


const useProgress = () => {
  const [progressPlugin, setProgressPlugin] = useState();
  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    !progressPlugin && setProgressPlugin(new ProgressPlugin({
      activeModules: true,
      modules: true,

      handler(percentage, message) {
        setPercentage(percentage);
        setMessage(message);
      }

    }));
  }, []);
  return {
    progressPlugin,
    percentage,
    message
  };
};
/**
 * Hook: useWebpack
 * @prop {compiler} compiler webpack.compiler
 * @prop {string}   options  project options
 */


const useWebpack = ({
  compiler,
  bud
}) => {
  const {
    progressPlugin,
    percentage,
    message
  } = useProgress();
  const [progressPluginApplied, setProgressPluginApplied] = useState(null);
  useEffect(() => {
    if (progressPlugin) {
      progressPlugin.apply(compiler);
      setProgressPluginApplied(true);
      bud.logger.info({
        name: 'bud.compiler'
      }, 'progress plugin applied');
    }
  }, [progressPlugin, compiler]);
  const [buildStats, setBuildStats] = useState({});
  const [buildErrors, setBuildErrors] = useState([]);
  const [webpackRunning, setWebpackRunning] = useState(null);
  const [devServer, setDevServer] = useState(null);
  useEffect(() => {
    const webpackCallback = (err, stats) => {
      if (err) {
        setBuildErrors(err);
        bud.logger.error({
          name: 'bud.compiler',
          err
        }, 'useWebpack generated build errors');
      }

      if (stats) {
        const jsonStats = stats === null || stats === void 0 ? void 0 : stats.toJson({
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
        });
        setBuildStats(jsonStats);
        bud.logger.info({
          name: 'bud.compiler',
          stats: jsonStats.assets.map(asset => asset.name)
        }, 'useWebpack generated build stats');
      }
    };

    if (progressPluginApplied) {
      if (!webpackRunning) {
        const watching = bud.features.enabled('watch');
        const hot = bud.features.enabled('hot');
        bud.logger.info({
          name: 'bud.compiler',
          hot,
          watching,
          progressPluginApplied
        }, 'starting compiler');
        watching && !bud.features.enabled('hot') ? compiler.watch({}, webpackCallback) : compiler.run(webpackCallback);
        setWebpackRunning(true);
      }
    }
  }, [progressPluginApplied, bud, compiler]);
  const [assets, setAssets] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    (buildStats === null || buildStats === void 0 ? void 0 : buildStats.assets) && setAssets(buildStats.assets);
    (buildStats === null || buildStats === void 0 ? void 0 : buildStats.warnings) && setWarnings(buildStats.warnings);
    (buildStats === null || buildStats === void 0 ? void 0 : buildStats.errors) && setErrors(buildStats === null || buildStats === void 0 ? void 0 : buildStats.errors);
  }, [buildStats, buildErrors]);
  useMemo(() => {
    if (webpackRunning && bud.features.enabled('hot') && !devServer && (buildStats || buildErrors)) {
      bud.logger.info({
        name: 'bud.compiler',
        webpackRunning,
        hot: bud.features.enabled('hot'),
        devServer,
        buildStats,
        buildErrors
      }, 'starting dev server');
      hotSyncServer(bud, compiler, (err, bs) => {
        setDevServer(bs.name);
      });
    }
  }, [webpackRunning, devServer]);
  useEffect(() => {
    assets && bud.logger.info({
      name: 'bud.compiler',
      assets: assets.map(asset => asset.name)
    }, 'new assets in component state');
  }, [assets]);
  return {
    assets,
    devServer,
    errors,
    hash: buildStats === null || buildStats === void 0 ? void 0 : buildStats.hash,
    time: buildStats === null || buildStats === void 0 ? void 0 : buildStats.time,
    warnings,
    percentage,
    message
  };
};

module.exports = {
  useWebpack
};