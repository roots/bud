import {Configuration} from 'webpack'
import node from './node'
import output from './output'
import optimization from './optimization'
import performance from './performance'
import resolve from './resolve'

const webpack: Configuration = {
  name: '@roots/bud',
  devtool: 'source-map',
  mode: 'none',
  amd: undefined,
  cache: true,
  context: undefined,
  entry: {},
  externals: {},
  node,
  output,
  optimization,
  parallelism: undefined,
  performance,
  plugins: [],
  profile: false,
  recordsPath: undefined,
  recordsInputPath: undefined,
  recordsOutputPath: undefined,
  resolve,
  resolveLoader: {},
  stats: {
    all: true,
  },
  target: 'web',
  watch: false,
  watchOptions: {},
}

export {webpack as default}
