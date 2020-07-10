import {env} from './env'
import {configs} from './configs'

/**
 * Options container.
 * @typedef {Object} options
 */
const options = {
  babel: configs.babel
    ? require(configs.babel)
    : ({presets: [], plugins: []}),
  postCss: configs.postCss
    ? require(configs.postCss)
    : ({plugins: []}),
  svg: {
    use: [
      require.resolve('@svgr/webpack'),
      require.resolve('url-loader'),
    ],
  },
  auto: {},
  browserSync: {
    host: env?.BROWSERSYNC_HOST ? env.BROWSERSYNC_HOST : 'localhost',
    port: env?.BROWSERSYNC_PORT ? env.BROWSERSYNC_PORT :  3000,
    proxy: env?.BROWSERSYNC_PROXY ? env.BROWSERSYNC_PROXY : '',
  },
  copy: {
    patterns: [],
  },
  dev: {
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
    },
  },
  devtool: 'cheap-module-source-map',
  entry: {},
  env: env,
  inlineManifest: {
    name: 'runtime',
  },
  splitting: {
    maxChunks: null,
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
