const browserSync = require('browser-sync');

const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackHotMiddleware = require('webpack-hot-middleware');

const makeMiddleware = (compiler, bud) => [webpackDevMiddleware(compiler, {
  headers: bud.state.options.dev.headers,
  logLevel: 'silent',
  publicPath: bud.state.paths.public || '/',
  stats: {
    all: false
  }
}), webpackHotMiddleware(compiler, {
  log: () => {}
})];

const injectHot = webpackConfig => {
  const client = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&overlay=true';
  Object.keys(webpackConfig.entry).forEach(entry => {
    webpackConfig.entry[entry] = [client].concat(webpackConfig.entry[entry]);
  });
  return webpackConfig;
};

const hotSyncServer = (bud, webpackConfig, compiler) => {
  browserSync.init({
    proxy: {
      target: 'bud-sandbox.valet',
      ws: true
    },
    logLevel: 'info',
    reloadOnRestart: true,
    injectFileTypes: ['js', 'css'],
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    },
    open: true,
    ui: {
      port: 3000
    },
    middleware: makeMiddleware(compiler, bud),
    injectChanges: true,
    watchOptions: {
      ignoreInitial: true
    },
    files: [bud.src('**/*.js'), bud.src('**/*.js'), bud.src('*.css'), bud.src('**/*.css')]
  });
};

const useDevServer = ({
  bud,
  webpackConfig,
  compiler
}) => {
  const out = hotSyncServer(bud, webpackConfig, compiler);
  console.log(out);
};

module.exports = {
  useDevServer
};