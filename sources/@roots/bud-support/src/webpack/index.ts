import type {
  Chunk,
  ChunkGraph,
  Compilation,
  Compiler,
  Configuration,
  DefinePlugin,
  EntryObject as WebpackEntryObject,
  MultiCompiler,
  MultiStats,
  PathData,
  ProgressPlugin,
  RuleSetRule,
  Stats,
  StatsAsset,
  StatsChunk,
  StatsChunkGroup,
  StatsCompilation,
  StatsError,
  StatsModule,
  StatsOptions,
  WebpackError,
  WebpackPluginFunction,
  WebpackPluginInstance,
} from 'webpack'
import webpack from 'webpack'

export type EntryObject = WebpackEntryObject & {
  import: Array<string>
  dependOn?: string | string[]
}

export default webpack
export type {
  Chunk,
  ChunkGraph,
  Compiler,
  Compilation,
  Configuration,
  DefinePlugin,
  MultiCompiler,
  MultiStats,
  PathData,
  ProgressPlugin,
  RuleSetRule,
  Stats,
  StatsAsset,
  StatsChunk,
  StatsChunkGroup,
  StatsCompilation,
  StatsError,
  StatsModule,
  StatsOptions,
  WebpackError,
  WebpackPluginFunction,
  WebpackPluginInstance,
}

import type * as Optimization from './types/optimization/index.js'
export type {Optimization}
