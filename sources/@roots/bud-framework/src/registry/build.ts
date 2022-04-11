import {Configuration, RuleSetRule} from 'webpack'

import {EntryObject} from '../config/entry'
import {PluginInstance} from '../extension'

export interface Build {
  'bail': boolean
  'cache': any
  'cache.buildDependencies': Record<string, Array<string>>
  'cache.cacheDirectory': string
  'cache.name': string
  'cache.version': string
  'cache.type': 'memory' | 'filesystem'
  'cache.managedPaths': Array<string>
  'context': Configuration['context']
  'devtool': Configuration['devtool']
  'entry': Record<string, EntryObject>
  'experiments': Configuration['experiments']
  'externals': Configuration['externals']
  'infrastructureLogging': Configuration['infrastructureLogging']
  'infrastructureLogging.level': Configuration['infrastructureLogging']['level']
  'infrastructureLogging.console': Configuration['infrastructureLogging']['console']
  'loader': Configuration['loader']
  'mode': Configuration['mode'] & ('production' | 'development')
  'module': Configuration['module']
  'module.noParse': Configuration['module']['noParse']
  'module.rules': Configuration['module']['rules']
  'module.rules.oneOf': Array<RuleSetRule>
  'module.rules.before': Array<RuleSetRule>
  'module.rules.after': Array<RuleSetRule>
  'module.unsafeCache': Configuration['module']['unsafeCache']
  'name': Configuration['name']
  'node': Configuration['node']
  'optimization': Configuration['optimization']
  'optimization.emitOnErrors': Configuration['optimization']['emitOnErrors']
  'optimization.minimize': Configuration['optimization']['minimize']
  'optimization.minimizer': Configuration['optimization']['minimizer']
  'optimization.moduleIds': Configuration['optimization']['moduleIds']
  'optimization.removeEmptyChunks': Configuration['optimization']['removeEmptyChunks']
  'optimization.runtimeChunk': Configuration['optimization']['runtimeChunk']
  'optimization.splitChunks': any
  'output': Configuration['output']
  'output.assetModuleFilename': Configuration['output']['assetModuleFilename']
  'output.chunkFilename': Configuration['output']['chunkFilename']
  'output.clean': Configuration['output']['clean']
  'output.filename': Configuration['output']['filename']
  'output.path': Configuration['output']['path']
  'output.pathinfo': Configuration['output']['pathinfo']
  'output.publicPath': string
  'parallelism': Configuration['parallelism']
  'performance': Configuration['performance']
  'plugins': Array<PluginInstance>
  'profile': Configuration['profile']
  'recordsPath': Configuration['recordsPath']
  'resolve': Configuration['resolve']
  'resolve.alias': Configuration['resolve']['alias']
  'resolve.extensions': Set<string>
  'resolve.modules': Configuration['resolve']['modules']
  'stats': Configuration['stats']
  'stats.preset': string
  'target': Configuration['target']
  'watch': Configuration['watch']
  'watchOptions': Configuration['watchOptions']
}
