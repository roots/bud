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
  headers: bud.state.options.dev.headers,
  publicPath: bud.state.paths.public || '/',
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
    console.log(msg);
  }
})];

const hotSyncServer = (bud, compiler, callback) => {
  return browserSync.init({
    proxy: {
      target: 'bud-sandbox.valet',
      ws: true
    },
    logLevel: 'silent',
    reloadOnRestart: true,
    injectFileTypes: ['js', 'css'],
    open: true,
    middleware: makeMiddleware(compiler, bud),
    injectChanges: true,
    watchOptions: {
      ignoreInitial: true
    },
    files: [bud.src('**/*.js'), bud.src('**/*.js'), bud.src('*.css'), bud.src('**/*.css')]
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
    }
  }, [progressPlugin, compiler]);
  const [buildStats, setBuildStats] = useState({});
  const [buildErrors, setBuildErrors] = useState([]);
  const [webpackRunning, setWebpackRunning] = useState(null);
  const [devServer, setDevServer] = useState(null);
  useEffect(() => {
    const webpackCallback = (err, stats) => {
      setBuildErrors(err);
      setBuildStats(stats === null || stats === void 0 ? void 0 : stats.toJson({
        version: true,
        hash: true,
        time: true,
        assets: true,
        errors: true,
        warnings: true
      }));
    };

    if (progressPluginApplied) {
      if (!webpackRunning) {
        setWebpackRunning(true);
        bud.featureEnabled('watch') ? compiler.watch({}, webpackCallback) : compiler.run(webpackCallback);
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
    if (webpackRunning && bud.featureEnabled('hot') && !devServer && (buildStats || buildErrors)) {
      hotSyncServer(bud, compiler, (err, bs) => {
        setDevServer(bs.name);
      });
    }
  }, [webpackRunning, devServer]);
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