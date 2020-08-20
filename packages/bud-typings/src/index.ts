interface Loose {
  [key: string]: any
}
export {Loose}

import {TransformOptions as BabelTransformOptions} from '@babel/core'
export {BabelTransformOptions}

import type {Options as BrowserSyncOptions} from 'browser-sync'
export type {BrowserSyncOptions}

import type {Configuration as WebpackConfig, RuleSetRule} from 'webpack'
export type WebpackDevServer = WebpackConfig['devServer']
export type WebpackEntry = WebpackConfig['entry']
export type WebpackExternals = WebpackConfig['externals']
export type WebpackMode = WebpackConfig['mode']
export type WebpackModule = WebpackConfig['module']
export type WebpackOptimization = WebpackConfig['optimization']
export type {RuleSetRule, WebpackConfig}
