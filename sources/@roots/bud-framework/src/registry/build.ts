import {Configuration, RuleSetRule} from 'webpack'

import {EntryObject} from '../config/entry'
import {Extension} from '../extension'

export interface Sync {
  'build.bail': boolean
  'build.cache': any
  'build.cache.buildDependencies': Record<string, Array<string>>
  'build.cache.cacheDirectory': string
  'build.cache.managedPaths': Array<string>
  'build.cache.name': string
  'build.cache.type': 'memory' | 'filesystem'
  'build.cache.version': string
  'build.context': Configuration['context']
  'build.devtool': Configuration['devtool']
  'build.entry': Record<string, EntryObject>
  'build.experiments': Configuration['experiments']
  'build.experiments.asyncWebAssembly': Configuration['experiments']['asyncWebAssembly']
  'build.experiments.backCompat': Configuration['experiments']['backCompat']
  'build.experiments.buildHttp': Configuration['experiments']['buildHttp']
  'build.experiments.buildHttp.allowedUris': Array<
    (uri: string) => boolean
  >
  'build.experiments.buildHttp.cacheLocation': string
  'build.experiments.buildHttp.frozen': boolean
  'build.experiments.buildHttp.lockfileLocation': string
  'build.experiments.buildHttp.proxy': string
  'build.experiments.buildHttp.upgrade': boolean
  'build.experiments.cacheUnaffected': Configuration['experiments']['cacheUnaffected']
  'build.experiments.css': Configuration['experiments']['css']
  'build.experiments.lazyCompilation': Configuration['experiments']['lazyCompilation']
  'build.experiments.futureDefaults': Configuration['experiments']['futureDefaults']
  'build.experiments.layers': Configuration['experiments']['layers']
  'build.experiments.syncWebAssembly': Configuration['experiments']['syncWebAssembly']
  'build.experiments.topLevelAwait': Configuration['experiments']['topLevelAwait']
  'build.experiments.outputModule': Configuration['experiments']['outputModule']
  'build.externals': Configuration['externals']
  'build.externalsType': Configuration['externalsType']
  'build.infrastructureLogging': Configuration['infrastructureLogging']
  'build.infrastructureLogging.level': Configuration['infrastructureLogging']['level']
  'build.infrastructureLogging.console': Configuration['infrastructureLogging']['console']
  'build.loader': Configuration['loader']
  'build.mode': Configuration['mode'] & ('production' | 'development')
  'build.module': Configuration['module']
  'build.module.noParse': Configuration['module']['noParse']
  'build.module.rules': Configuration['module']['rules']
  'build.module.rules.oneOf': Array<RuleSetRule>
  'build.module.rules.before': Array<RuleSetRule>
  'build.module.rules.after': Array<RuleSetRule>
  'build.module.unsafeCache': Configuration['module']['unsafeCache']
  'build.name': Configuration['name']
  'build.node': Configuration['node']
  'build.optimization': Configuration['optimization']
  'build.optimization.emitOnErrors': Configuration['optimization']['emitOnErrors']
  'build.optimization.minimize': Configuration['optimization']['minimize']
  'build.optimization.minimizer': Configuration['optimization']['minimizer']
  'build.optimization.moduleIds': Configuration['optimization']['moduleIds']
  'build.optimization.removeEmptyChunks': Configuration['optimization']['removeEmptyChunks']
  'build.optimization.runtimeChunk': Configuration['optimization']['runtimeChunk']
  'build.optimization.splitChunks': any
  'build.output': Configuration['output']
  'build.output.assetModuleFilename': Configuration['output']['assetModuleFilename']
  'build.output.chunkFilename': Configuration['output']['chunkFilename']
  'build.output.chunkFormat': Configuration['output']['chunkFormat']
  'build.output.chunkLoading': Configuration['output']['chunkLoading']
  'build.output.clean': Configuration['output']['clean']
  'build.output.environment': Configuration['output']['environment']
  'build.output.filename': Configuration['output']['filename']
  'build.output.module': Configuration['output']['module']
  'build.output.path': Configuration['output']['path']
  'build.output.pathinfo': Configuration['output']['pathinfo']
  'build.output.publicPath': string
  'build.parallelism': Configuration['parallelism']
  'build.performance': Configuration['performance']
  'build.profile': Configuration['profile']
  'build.recordsPath': Configuration['recordsPath']
  'build.resolve.extensions': Set<string>
  'build.stats': Configuration['stats']
  'build.stats.preset': string
  'build.target': Configuration['target']
  'build.watch': Configuration['watch']
  'build.watchOptions': Configuration['watchOptions']
}

export interface Async {
  'build.plugins': Array<Extension.PluginInstance>
  'build.resolve': Configuration['resolve']
  'build.resolve.alias': Configuration['resolve']['alias']
  'build.resolve.aliasFields': Configuration['resolve']['aliasFields']
  'build.resolve.modules': Configuration['resolve']['modules']
}
