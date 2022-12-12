import type {
  Compiler,
  Configuration,
  Optimization,
  RuleSetRule,
} from '@roots/bud-support/webpack'

import type {EntryObject} from '../config/entry.js'

export interface Sync {
  bail: boolean | undefined
  cache: any | undefined
  'cache.buildDependencies': Record<string, Array<string>> | undefined
  'cache.cacheDirectory': string | undefined
  'cache.managedPaths': Array<string> | undefined
  'cache.name': string | undefined
  'cache.type': 'memory' | 'filesystem' | undefined
  'cache.version': string | undefined
  context: Configuration['context'] | undefined
  dependencies: Configuration['dependencies'] | undefined
  devtool: Configuration['devtool'] | undefined
  entry: Record<string, EntryObject> | undefined
  experiments: Configuration['experiments'] | undefined
  externals:
    | Record<string, RegExp | string | Array<string | RegExp>>
    | undefined
  externalsType: Configuration['externalsType'] | undefined
  infrastructureLogging: Configuration['infrastructureLogging'] | undefined
  'infrastructureLogging.level':
    | Configuration['infrastructureLogging']['level']
    | undefined
  'infrastructureLogging.console':
    | Configuration['infrastructureLogging']['console']
    | undefined
  loader: Configuration['loader'] | undefined
  mode: Configuration['mode'] & ('production' | 'development')
  module: Configuration['module'] | undefined
  'module.noParse': Configuration['module']['noParse'] | undefined
  'module.rules': Configuration['module']['rules'] | undefined
  'module.rules.oneOf': Array<RuleSetRule> | undefined
  'module.rules.before': Array<RuleSetRule> | undefined
  'module.rules.after': Array<RuleSetRule> | undefined
  'module.unsafeCache': Configuration['module']['unsafeCache'] | undefined
  name: Configuration['name'] | undefined
  node: Configuration['node'] | undefined
  optimization: Configuration['optimization'] | undefined
  'optimization.emitOnErrors':
    | Configuration['optimization']['emitOnErrors']
    | undefined
  'optimization.minimize':
    | Configuration['optimization']['minimize']
    | undefined
  'optimization.minimizer':
    | Array<((compiler: Compiler) => void) | {apply: any} | '...'>
    | undefined
  'optimization.moduleIds':
    | Configuration['optimization']['moduleIds']
    | undefined
  'optimization.removeEmptyChunks':
    | Configuration['optimization']['removeEmptyChunks']
    | undefined
  'optimization.runtimeChunk':
    | Configuration['optimization']['runtimeChunk']
    | undefined
  'optimization.splitChunks': Optimization.SplitChunks | false | undefined
  output: Configuration['output'] | undefined
  'output.assetModuleFilename':
    | Configuration['output']['assetModuleFilename']
    | undefined
  'output.chunkFilename':
    | Configuration['output']['chunkFilename']
    | undefined
  'output.chunkFormat': Configuration['output']['chunkFormat'] | undefined
  'output.chunkLoading':
    | Configuration['output']['chunkLoading']
    | undefined
  'output.clean': (Configuration['output']['clean'] & boolean) | undefined
  'output.environment': Configuration['output']['environment'] | undefined
  'output.filename': Configuration['output']['filename'] | undefined
  'output.hotUpdateChunkFilename':
    | Configuration['output']['hotUpdateChunkFilename']
    | undefined
  'output.hotUpdateMainFilename':
    | Configuration['output']['hotUpdateMainFilename']
    | undefined
  'output.module': Configuration['output']['module'] | undefined
  'output.path': Configuration['output']['path'] | undefined
  'output.pathinfo': Configuration['output']['pathinfo'] | undefined
  'output.publicPath': string | undefined
  'output.scriptType': false | `module` | `text/javascript` | undefined
  'output.uniqueName': string | undefined
  parallelism: Configuration['parallelism'] | undefined
  performance: Configuration['performance'] | undefined
  profile: Configuration['profile'] | undefined
  recordsPath: Configuration['recordsPath'] | undefined
  'resolve.extensions': Set<string> | undefined
  stats: Configuration['stats'] | undefined
  'stats.preset': string | undefined
  target: Configuration['target'] | undefined
  watch: Configuration['watch'] | undefined
  watchOptions: Configuration['watchOptions'] | undefined
}

export type SyncRegistry = {
  [P in keyof Sync as `build.${P & string}`]: Sync[P]
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
