import {Configuration} from 'webpack'
import {join} from 'path'

export const chunkFilename: Configuration['output']['chunkFilename'] =
  '[name].js'

export const chunkLoadTimeout: Configuration['output']['chunkLoadTimeout'] = 120000

export const crossOriginLoading: Configuration['output']['crossOriginLoading'] = false

export const devtoolLineToLine: Configuration['output']['devtoolLineToLine'] = false

export const filename: Configuration['output']['filename'] =
  '[name].js'

export const publicPath: Configuration['output']['publicPath'] =
  '/'

export const path: Configuration['output']['path'] = join(
  process.cwd(),
  'build',
)

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
