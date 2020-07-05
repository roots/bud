import {loaders} from './../loaders'

/**
 * Options container.
 * @typedef  {Object.<options>}
 */
const options = {
  ...loaders,
  auto: {},
  browserSync: {
    host: 'localhost',
    port: '3000',
    proxy: '',
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
  groups: [],
  inlineManifest: {
    name: 'runtime',
  },
  splitting: {
    maxChunks: null,
  },
  dependencyManifest: {
    useDefaults: true,
    injectPolyfill: false,
    outputFormat: 'json',
  },
}

export {options}
