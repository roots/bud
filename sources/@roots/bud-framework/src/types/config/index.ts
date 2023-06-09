import type {Optimization} from '@roots/bud-support/webpack'
import type {
  Compilation,
  Compiler,
  Configuration,
  DefinePlugin,
  HotModuleReplacementPlugin,
  MultiCompiler,
  MultiStats,
  RuleSetRule,
  StatsAsset,
  StatsChunkGroup,
  StatsCompilation,
  StatsError,
  StatsModule,
  StatsOptions,
  WebpackPluginInstance,
} from 'webpack'

import type {EntryObject} from './entry.js'

type Mode = `production` | `development`

export type {
  Compiler,
  Compilation,
  Configuration,
  DefinePlugin,
  EntryObject,
  HotModuleReplacementPlugin,
  Mode,
  MultiCompiler,
  MultiStats,
  Optimization,
  RuleSetRule,
  StatsAsset,
  StatsChunkGroup,
  StatsCompilation,
  StatsError,
  StatsModule,
  StatsOptions,
  WebpackPluginInstance,
}
