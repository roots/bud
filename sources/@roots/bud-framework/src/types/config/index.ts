export type {EntryObject} from './entry.js'

export type Mode = `development` | `production`

export type * as Optimization from './optimization/index.js'

export type {
  Compilation,
  Compiler,
  Configuration,
  DefinePlugin,
  HotModuleReplacementPlugin,
  MultiCompiler,
  MultiStats,
  ProvidePlugin,
  RuleSetRule,
  StatsAsset,
  StatsChunkGroup,
  StatsCompilation,
  StatsError,
  StatsModule,
  StatsOptions,
  WebpackPluginInstance,
} from '@roots/bud-support/webpack'
