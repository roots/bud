import {Configuration} from 'webpack'
import {resolve} from 'path'

const output: Configuration['output'] = {
  chunkFilename: '[name][query]',
  chunkLoadTimeout: 120000,
  crossOriginLoading: false,
  devtoolLineToLine: false,
  filename: '[name].js',
  publicPath: '/',
  path: resolve(process.cwd(), 'dist'),

  /**
   * Unspecified.
   */
  // path: resolve(process.cwd(), 'dist'),
  // devtoolNamespace: undefined,
  // globalObject: 'window',
  // hashDigest: 'hex',
  // sourcePrefix: '',
  // futureEmitAssets: true,
  // hashDigestLength: 8,
  // hashFunction: 'md4',
  // hashSalt: undefined,
  // hotUpdateChunkFilename: '[id].[hash].hot-update.js',
  // hotUpdateFunction: 'webpackHotUpdate',
  // hotUpdateMainFilename: '[hash].hot-update.json',
  // jsonpFunction: 'webpackJsonp',
  // jsonpScriptType: 'text/javascript',
  // library: undefined,
  // libraryExport: undefined,
  // libraryTarget: 'var',,
  // sourceMapFilename: '[file].map[query]',
  // umdNamedDefine: false,
}

export {output as default}
