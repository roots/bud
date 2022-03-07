import {Configuration, RuleSetRule} from 'webpack'

import {EntryObject} from './entry'
import {PluginInstance} from './Extensions/Extension'

export interface ConfigMap {
  [`build.bail`]: boolean
  [`build.cache`]: any
  [`build.cache.buildDependencies`]: Record<string, Array<string>>
  [`build.cache.cacheDirectory`]: string
  [`build.cache.name`]: string
  [`build.cache.version`]: string
  [`build.cache.type`]: `memory` | `filesystem`
  [`build.cache.managedPaths`]: Array<string>
  [`build.context`]: Configuration[`context`]
  [`build.devtool`]: Configuration[`devtool`]
  [`build.entry`]: Record<string, EntryObject>
  [`build.experiments`]: Configuration[`experiments`]
  [`build.externals`]: Configuration[`externals`]
  [`build.infrastructureLogging`]: Configuration[`infrastructureLogging`]
  [`build.infrastructureLogging.level`]: Configuration[`infrastructureLogging`][`level`]
  [`build.infrastructureLogging.console`]: Configuration[`infrastructureLogging`][`console`]
  [`build.loader`]: Configuration[`loader`]
  [`build.mode`]: Configuration[`mode`] & (`production` | `development`)
  [`build.module`]: Configuration[`module`]
  [`build.module.noParse`]: Configuration[`module`][`noParse`]
  [`build.module.rules`]: Configuration[`module`][`rules`]
  [`build.module.rules.oneOf`]: Array<RuleSetRule>
  [`build.module.rules.before`]: Array<RuleSetRule>
  [`build.module.rules.after`]: Array<RuleSetRule>
  [`build.module.unsafeCache`]: Configuration[`module`][`unsafeCache`]
  [`build.name`]: Configuration[`name`]
  [`build.node`]: Configuration[`node`]
  [`build.optimization`]: Configuration[`optimization`]
  [`build.optimization.emitOnErrors`]: Configuration[`optimization`][`emitOnErrors`]
  [`build.optimization.minimize`]: Configuration[`optimization`][`minimize`]
  [`build.optimization.minimizer`]: Configuration[`optimization`][`minimizer`]
  [`build.optimization.moduleIds`]: Configuration[`optimization`][`moduleIds`]
  [`build.optimization.removeEmptyChunks`]: Configuration[`optimization`][`removeEmptyChunks`]
  [`build.optimization.runtimeChunk`]: Configuration[`optimization`][`runtimeChunk`]
  [`build.optimization.splitChunks`]: any
  [`build.output`]: Configuration[`output`]
  [`build.output.assetModuleFilename`]: Configuration[`output`][`assetModuleFilename`]
  [`build.output.chunkFilename`]: Configuration[`output`][`chunkFilename`]
  [`build.output.clean`]: Configuration[`output`][`clean`]
  [`build.output.filename`]: Configuration[`output`][`filename`]
  [`build.output.path`]: Configuration[`output`][`path`]
  [`build.output.pathinfo`]: Configuration[`output`][`pathinfo`]
  [`build.output.publicPath`]: string
  [`build.parallelism`]: Configuration[`parallelism`]
  [`build.performance`]: Configuration[`performance`]
  [`build.plugins`]: Array<PluginInstance>
  [`build.profile`]: Configuration[`profile`]
  [`build.recordsPath`]: Configuration[`recordsPath`]
  [`build.resolve`]: Configuration[`resolve`]
  [`build.resolve.alias`]: Configuration[`resolve`][`alias`]
  [`build.resolve.extensions`]: Set<string>
  [`build.stats`]: Configuration[`stats`]
  [`build.stats.preset`]: string
  [`build.target`]: Configuration[`target`]
  [`build.watch`]: Configuration[`watch`]
  [`build.watchOptions`]: Configuration[`watchOptions`]
}
