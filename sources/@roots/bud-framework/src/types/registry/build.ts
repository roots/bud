import type {
  Compiler,
  Configuration,
  Optimization,
  RuleSetRule,
} from '@roots/bud-support/webpack'
import type {StatsOptions} from '@roots/bud-support/webpack'

import type {EntryObject} from '../config/entry.js'

export interface Sync {
  bail: boolean
  cache: any
  'cache.buildDependencies': Record<string, Array<string>>
  'cache.cacheDirectory': string
  'cache.managedPaths': Array<string>
  'cache.name': string
  'cache.type': 'memory' | 'filesystem'
  'cache.version': string
  context: Configuration['context']
  dependencies: Configuration['dependencies']
  devtool: Configuration['devtool']
  entry: Record<string, EntryObject>
  experiments: Configuration['experiments']
  externals: Record<string, RegExp | string | Array<string | RegExp>>
  externalsType: Configuration['externalsType']
  infrastructureLogging: Configuration['infrastructureLogging']
  'infrastructureLogging.level': Configuration['infrastructureLogging']['level']
  'infrastructureLogging.console':
    | Configuration['infrastructureLogging']['console']
  loader: Configuration['loader']
  mode: Configuration['mode'] & ('production' | 'development')
  module: Configuration['module']
  'module.noParse': Configuration['module']['noParse']
  'module.rules': Configuration['module']['rules']
  'module.rules.oneOf': Array<RuleSetRule>
  'module.rules.before': Array<RuleSetRule>
  'module.rules.after': Array<RuleSetRule>
  'module.unsafeCache': Configuration['module']['unsafeCache']
  name: Configuration['name']
  node: Configuration['node']
  optimization: Configuration['optimization']
  'optimization.emitOnErrors': Configuration['optimization']['emitOnErrors']
  'optimization.minimize': Configuration['optimization']['minimize']
  'optimization.minimizer': Array<
    ((compiler: Compiler) => void) | {apply: any} | '...'
  >
  'optimization.moduleIds': Configuration['optimization']['moduleIds']
  'optimization.removeEmptyChunks':
    | Configuration['optimization']['removeEmptyChunks']
  'optimization.runtimeChunk': Configuration['optimization']['runtimeChunk']
  'optimization.splitChunks': Optimization.SplitChunks | false
  'optimization.usedExports': Configuration['optimization']['usedExports']
  output: Configuration['output']
  'output.assetModuleFilename': Configuration['output']['assetModuleFilename']
  'output.chunkFilename': Configuration['output']['chunkFilename']
  'output.chunkFormat': Configuration['output']['chunkFormat']
  'output.chunkLoading': Configuration['output']['chunkLoading']
  'output.clean': Configuration['output']['clean'] & boolean
  'output.environment': Configuration['output']['environment']
  'output.filename': Configuration['output']['filename']
  'output.hotUpdateChunkFilename':
    | Configuration['output']['hotUpdateChunkFilename']
  'output.hotUpdateMainFilename':
    | Configuration['output']['hotUpdateMainFilename']
  'output.module': Configuration['output']['module']
  'output.path': Configuration['output']['path']
  'output.pathinfo': Configuration['output']['pathinfo']
  'output.publicPath': string
  'output.scriptType': false | `module` | `text/javascript`
  'output.uniqueName': string
  parallelism: Configuration['parallelism']
  performance: Configuration['performance']
  profile: Configuration['profile']
  recordsPath: Configuration['recordsPath']
  'resolve.extensions': Set<string>
  snapshot: Configuration[`snapshot`]
  'snapshot.managedPaths': Configuration[`snapshot`][`managedPaths`]

  stats: StatsOptions
  'stats.preset': string
  target: Configuration['target']
  watch: Configuration['watch']
  watchOptions: Configuration['watchOptions']
}

export type SyncRegistry = {
  [P in keyof Sync as `build.${P & string}`]: Sync[P] | undefined
}

export interface Async {
  plugins: Array<any>
  resolve: any
  'resolve.alias': {[index: string]: string | false | string[]} | undefined
  'resolve.aliasFields':
    | Configuration['resolve']['aliasFields']
    | undefined
  'resolve.modules': Configuration['resolve']['modules'] | undefined
}

export type AsyncRegistry = {
  [P in keyof Async as `build.${P & string}`]: Async[P]
}

export type Registry = SyncRegistry & AsyncRegistry
