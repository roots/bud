"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.path = exports.publicPath = exports.filename = void 0;
const path_1 = require("path");
// export const chunkFilename: Configuration['output']['chunkFilename'] = '[name].js'
// export const chunkLoadTimeout: Configuration['output']['chunkLoadTimeout'] = 120000
// export const crossOriginLoading: Configuration['output']['crossOriginLoading'] = false
exports.filename = '[name].js';
exports.publicPath = '/';
exports.path = path_1.resolve(process.cwd(), 'dist');
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
//# sourceMappingURL=output.js.map