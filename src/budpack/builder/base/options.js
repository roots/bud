import {join} from 'path'
import dotenv from 'dotenv'

import {paths} from './paths'
import {loaders} from './loaders'

/**
 * Environment variables container.
 * @typedef {Object} env
 */
const env = dotenv.config({
  path: join(paths.project, '.env'),
})

/**
 * Options container.
 * @typedef {Object} options
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
  env: env.parsed,
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
