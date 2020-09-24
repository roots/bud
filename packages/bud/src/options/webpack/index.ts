import {Configuration} from 'webpack'
import node from './node'
import output from './output'
import optimization from './optimization'
import performance from './performance'
import resolve from './resolve'

const webpack: Configuration = {
  name: '@roots/bud',
  bail: true,
  cache: true,
  devtool: 'source-map',
  mode: 'none',
  entry: {},
  stats: {
    all: true,
  },
  target: 'web',
  watch: false,
  node,
  output,
  optimization,
  performance,
  resolve,

  // context: process.cwd(), // hardwire bud.paths.src
  // amd: undefined,
  // parallelism: undefined,
  // externals: {},
  // plugins: [],
  // profile: false,
  // recordsPath: undefined,
  // recordsInputPath: undefined,
  // recordsOutputPath: undefined,
  // resolveLoader: {},
  // watchOptions: {},
}

export {webpack as default}
