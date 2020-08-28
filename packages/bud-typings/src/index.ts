interface Pair {
  [key: string]: any
}

interface LooselyDefined {
  [key: string]: any | any[]
}
export declare type Loose = LooselyDefined

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

export type WebpackEntry = WebpackConfig['entry']
export type WebpackExternals = WebpackConfig['externals']
export type WebpackMode = WebpackConfig['mode']
export type WebpackModule = WebpackConfig['module']
export type WebpackOptimization = WebpackConfig['optimization']
export type WebpackOutput = WebpackConfig['output']
export type WebpackPlugins = WebpackConfig['plugins']
export type WebpackResolve = WebpackConfig['resolve']
export type WebpackTarget = WebpackConfig['target']
export {
  WebpackConfig,
  WebpackConfigFactory,
  WebpackOptions,
  WebpackRule,
}

import {Configuration as WebpackDevServer} from 'webpack-dev-server'
export {WebpackDevServer}
