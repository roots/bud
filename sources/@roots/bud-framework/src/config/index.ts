export type {EntryObject} from './entry.js'

export type Mode = `development` | `production`

export type * as Optimization from './optimization/index.js'

export type {
  Compilation,
  Compiler,
  Configuration,
  DefinePlugin,
  FileCacheOptions,
  HotModuleReplacementPlugin,
  MultiCompiler,
  MultiStats,
  ProvidePlugin,
  RuleSetRule,
  Stats,
  StatsAsset,
  StatsChunkGroup,
  StatsCompilation,
  StatsError,
  StatsModule,
  StatsOptions,
  Webpack,
  WebpackError,
  WebpackPluginInstance,
} from '@roots/bud-support/webpack'
