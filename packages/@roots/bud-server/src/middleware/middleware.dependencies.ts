import {lodash} from '@roots/bud-support'
export const {isNull, isUndefined} = lodash

import WebpackDevMiddleware from 'webpack-dev-middleware'
export {WebpackDevMiddleware}

import WebpackHotMiddleware from 'webpack-hot-middleware'
export {WebpackHotMiddleware}

export {createProxyMiddleware} from 'http-proxy-middleware'

import zlib from 'zlib'
export {zlib}
