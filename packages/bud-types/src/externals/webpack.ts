import {
  Compiler as WebpackCompiler,
  Configuration as WebpackConfig,
  ConfigurationFactory as WebpackConfigFactory,
  Options as WebpackOptions,
  RuleSetRule as WebpackRule,
  Stats as WebpackStats,
  RuleSetLoader,
} from 'webpack'

import {Options as WebpackDevMiddlewareOptions} from 'webpack-dev-middleware'

type WebpackEntry = WebpackConfig['entry']
type WebpackExternals = WebpackConfig['externals']
type WebpackMode = WebpackConfig['mode']
type WebpackModule = WebpackConfig['module']
type WebpackOptimization = WebpackConfig['optimization']
type WebpackOutput = WebpackConfig['output']
type WebpackPlugins = WebpackConfig['plugins']
type WebpackResolve = WebpackConfig['resolve']
type WebpackTarget = WebpackConfig['target']

export type {
  WebpackCompiler,
  WebpackConfig,
  WebpackConfigFactory,
  WebpackDevMiddlewareOptions,
  WebpackEntry,
  WebpackExternals,
  WebpackMode,
  WebpackModule,
  WebpackOptimization,
  WebpackOptions,
  WebpackOutput,
  WebpackPlugins,
  WebpackResolve,
  WebpackStats,
  WebpackTarget,
  WebpackRule,
  RuleSetLoader,
}
