import type {
  Compiler as WebpackCompiler,
  Configuration as WebpackConfig,
  ConfigurationFactory as WebpackConfigFactory,
  Options as WebpackOptions,
  RuleSetRule as WebpackRule,
} from 'webpack'

import {Options as WebpackDevServer} from 'webpack-dev-middleware'

type WebpackEntry = WebpackConfig['entry']
type WebpackExternals = WebpackConfig['externals']
type WebpackMode = WebpackConfig['mode']
type WebpackModule = WebpackConfig['module']
type WebpackOptimization = WebpackConfig['optimization']
type WebpackOutput = WebpackConfig['output']
type WebpackPlugins = WebpackConfig['plugins']
type WebpackResolve = WebpackConfig['resolve']
type WebpackTarget = WebpackConfig['target']

export {
  WebpackCompiler,
  WebpackConfig,
  WebpackConfigFactory,
  WebpackDevServer,
  WebpackEntry,
  WebpackExternals,
  WebpackMode,
  WebpackModule,
  WebpackOptimization,
  WebpackOptions,
  WebpackOutput,
  WebpackPlugins,
  WebpackResolve,
  WebpackTarget,
  WebpackRule,
}
