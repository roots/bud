import {env} from './env'
import {configs} from './configs'

const babelFallback = {
  presets: [],
  plugins: [],
}

const postCssFallback = {
  plugins: [],
}

/**
 * Options container.
 */
const options = {
  babel: configs.babel
    ? require(configs.babel)
    : babelFallback,
  postCss: configs.postCss
    ? require(configs.postCss)
    : postCssFallback,
  typescript: configs.typescript
    ? require(configs.typescript)
    : {},
  svg: {
    use: [
      require.resolve('@svgr/webpack'),
      require.resolve('url-loader'),
    ],
  },
  auto: {},
  browserSync: {
    host: env?.BROWSERSYNC_HOST
      ? env.BROWSERSYNC_HOST
      : 'localhost',
    port: env?.BROWSERSYNC_PORT
      ? env.BROWSERSYNC_PORT
      : 3000,
    proxy: env?.BROWSERSYNC_PROXY
      ? env.BROWSERSYNC_PROXY
      : null,
  },
  copy: {
    patterns: [],
  },
  dev: {
    clientLogLevel: 'none',
    compress: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    hotOnly: true,
    injectHot: true,
    open: false,
    overlay: true,
    watchOptions: {
      aggregateTimeout: 300,
    },
  },
  devtool: 'cheap-module-source-map',
  entry: {},
  env: env,
  externals: {
    jquery: 'jQuery',
    lodash: 'lodash',
    moment: 'moment',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  inlineManifest: {
    name: 'runtime',
  },
  splitting: {
    maxChunks: null,
  },
  target: 'web',
  uglify: {
    cache: true,
    chunkFilter: ({name}) => name === 'vendor',
    extractComments: false,
    parallel: true,
    uglifyOptions: {
      output: {
        beautify: false,
      },
      compress: false,
      mangle: {
        toplevel: true,
      },
    },
  },
  vendor: {
    name: 'vendor',
    vendors: [],
  },
  dependencyManifest: {
    combineAssets: false,
    injectPolyfill: false,
    outputFormat: 'json',
  },
}

export {options}
