import {Configuration} from 'webpack'
import {resolve} from 'path'

// export const chunkFilename: Configuration['output']['chunkFilename'] = '[name].js'
// export const chunkLoadTimeout: Configuration['output']['chunkLoadTimeout'] = 120000
// export const crossOriginLoading: Configuration['output']['crossOriginLoading'] = false

export const filename: Configuration['output']['filename'] =
  '[name].js'

export const publicPath: Configuration['output']['publicPath'] =
  '/'

export const path: Configuration['output']['path'] = resolve(
  process.cwd(),
  'dist',
)

//library: undefined
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
// libraryExport: undefined,
// libraryTarget: 'var',,
// sourceMapFilename: '[file].map[query]',
// umdNamedDefine: false,

/**
 * @deprecated webpack5
 */
// export const devtoolLineToLine: Configuration['output']['devtoolLineToLine'] = false
