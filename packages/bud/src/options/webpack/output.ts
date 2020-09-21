import {Configuration} from 'webpack'

const output: Configuration['output'] = {
  chunkFilename: '[name].js',
  chunkLoadTimeout: 120000,
  crossOriginLoading: false,
  devtoolLineToLine: false,
  devtoolNamespace: 'bud',
  filename: '[name].js',
  globalObject: 'window',
  hashDigest: 'hex',
  hashDigestLength: 8,
  hashFunction: 'md4',
  hashSalt: 'bud',
  hotUpdateChunkFilename: '[id].[hash].bud.update.js',
  hotUpdateFunction: 'webpackHotUpdate',
  hotUpdateMainFilename: '[hash].bud.update.json',
  jsonpFunction: 'webpackJsonp',
  jsonpScriptType: 'text/javascript',
  library: undefined,
  libraryExport: undefined,
  libraryTarget: 'var',
  pathinfo: true,
  publicPath: '/',
  sourceMapFilename: '[file].map[query]',
  umdNamedDefine: false,
  path: undefined,
  sourcePrefix: '',
  futureEmitAssets: true,
}

export {output as default}
