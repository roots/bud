interface Loose {
  [key: string]: any
}
export {Loose}

import {TransformOptions as BabelTransformOptions} from '@babel/core'
export {BabelTransformOptions}

import type {Options as BrowserSyncOptions} from 'browser-sync'
export type {BrowserSyncOptions}

import type {
  Configuration as WebpackConfig,
  ConfigurationFactory as WebpackConfigFactory,
  RuleSetRule as WebpackRule,
  Options as WebpackOptions,
} from 'webpack'

export type WebpackDevServer = WebpackConfig['devServer']
export type WebpackEntry = WebpackConfig['entry']
export type WebpackExternals = WebpackConfig['externals']
export type WebpackMode = WebpackConfig['mode']
export type WebpackModule = WebpackConfig['module']
export type WebpackOptimization = WebpackConfig['optimization']
export type WebpackOutput = WebpackConfig['output']
export type WebpackPlugins = WebpackConfig['plugins']
export type WebpackResolve = WebpackConfig['resolve']
export type WebpackTarget = WebpackConfig['target']
export type {WebpackConfig, WebpackConfigFactory, WebpackOptions, WebpackRule}
