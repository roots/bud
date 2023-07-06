import type {
  Compiler,
  Configuration,
  EntryObject,
  Optimization,
  RuleSetRule,
  StatsOptions,
} from '@roots/bud-framework/config'

export interface Sync {
  bail: boolean
  cache: any
  'cache.buildDependencies': Record<string, Array<string>>
  'cache.cacheDirectory': string
  'cache.managedPaths': Array<string>
  'cache.name': string
  'cache.type': `filesystem` | `memory`
  'cache.version': string
  context: Configuration[`context`]
  dependencies: Configuration[`dependencies`]
  devtool: Configuration[`devtool`]
  entry: Record<string, EntryObject>
  experiments: Configuration[`experiments`]
  externals: Record<string, Array<RegExp | string> | RegExp | string>
  externalsType: Configuration[`externalsType`]
  infrastructureLogging: Configuration[`infrastructureLogging`]
  'infrastructureLogging.console':
    | Configuration[`infrastructureLogging`][`console`]
  'infrastructureLogging.level': Configuration[`infrastructureLogging`][`level`]
  loader: Configuration[`loader`]
  mode: Configuration[`mode`] & ('development' | 'production')
  module: Configuration[`module`]
  'module.noParse': Configuration[`module`][`noParse`]
  'module.rules': Configuration[`module`][`rules`]
  'module.rules.after': Array<RuleSetRule>
  'module.rules.before': Array<RuleSetRule>
  'module.rules.oneOf': Array<RuleSetRule>
  'module.unsafeCache': Configuration[`module`][`unsafeCache`]
  name: Configuration[`name`]
  node: Configuration[`node`]
  optimization: Configuration[`optimization`]
  'optimization.emitOnErrors': Configuration[`optimization`][`emitOnErrors`]
  'optimization.innerGraph': Configuration[`optimization`][`innerGraph`]
  'optimization.mergeDuplicateChunks': Configuration[`optimization`][`mergeDuplicateChunks`]
  'optimization.minimize': Configuration[`optimization`][`minimize`]
  'optimization.minimizer': Array<
    '...' | ((compiler: Compiler) => void) | {apply: any}
  >
  'optimization.moduleIds': Configuration[`optimization`][`moduleIds`]
  'optimization.nodeEnv': Configuration[`optimization`][`nodeEnv`]
  'optimization.providedExports': Configuration[`optimization`][`providedExports`]
  'optimization.removeAvailableModules': Configuration[`optimization`][`removeAvailableModules`]
  'optimization.removeEmptyChunks':
    | Configuration[`optimization`][`removeEmptyChunks`]
  'optimization.runtimeChunk': Configuration[`optimization`][`runtimeChunk`]
  'optimization.sideEffects': Configuration[`optimization`][`sideEffects`]
  'optimization.splitChunks': false | Optimization.SplitChunks
  'optimization.usedExports': Configuration[`optimization`][`usedExports`]
  output: Configuration[`output`]
  'output.assetModuleFilename': Configuration[`output`][`assetModuleFilename`]
  'output.chunkFilename': Configuration[`output`][`chunkFilename`]
  'output.chunkFormat': Configuration[`output`][`chunkFormat`]
  'output.chunkLoading': Configuration[`output`][`chunkLoading`]
  'output.clean': Configuration[`output`][`clean`] & boolean
  'output.environment': Configuration[`output`][`environment`]
  'output.filename': Configuration[`output`][`filename`]
  'output.hashFunction': Configuration[`output`][`hashFunction`]
  'output.hotUpdateChunkFilename':
    | Configuration[`output`][`hotUpdateChunkFilename`]
  'output.hotUpdateMainFilename':
    | Configuration[`output`][`hotUpdateMainFilename`]
  'output.iife': Configuration[`output`][`iife`]
  'output.module': Configuration[`output`][`module`]
  'output.path': Configuration[`output`][`path`]
  'output.pathinfo': Configuration[`output`][`pathinfo`]
  'output.publicPath': string
  'output.scriptType': `module` | `text/javascript` | false
  'output.uniqueName': string
  parallelism: Configuration[`parallelism`]
  performance: Configuration[`performance`]
  profile: Configuration[`profile`]
  recordsPath: Configuration[`recordsPath`]
  'resolve.extensionAlias': Configuration[`resolve`][`extensionAlias`]
  'resolve.extensions': Set<string>
  resolveLoader: Configuration[`resolveLoader`]
  'resolveLoader.alias': Configuration[`resolveLoader`][`alias`]
  snapshot: Configuration[`snapshot`]
  'snapshot.buildDependencies': Configuration[`snapshot`][`buildDependencies`]
  'snapshot.immutablePaths': Configuration[`snapshot`][`immutablePaths`]
  'snapshot.managedPaths': Configuration[`snapshot`][`managedPaths`]
  'snapshot.module': Configuration[`snapshot`][`module`]
  'snapshot.resolve': Configuration[`snapshot`][`resolve`]
  'snapshot.resolveBuildDependencies': Configuration[`snapshot`][`resolveBuildDependencies`]
  stats: StatsOptions
  'stats.preset': string
  target: Configuration[`target`]
  watch: Configuration[`watch`]
  watchOptions: Configuration[`watchOptions`]
}

export type SyncRegistry = {
  [P in keyof Sync as `build.${P & string}`]: Sync[P] | undefined
}

export interface Async {
  plugins: Array<any>
  resolve: any
  'resolve.alias': {[index: string]: false | string | string[]} | undefined
  'resolve.aliasFields': Configuration[`resolve`][`aliasFields`]
  'resolve.extensionAlias': Configuration[`resolve`][`extensionAlias`]
  'resolve.modules': Configuration[`resolve`][`modules`] | undefined
}

export type AsyncRegistry = {
  [P in keyof Async as `build.${P & string}`]: Async[P]
}

export type Registry = SyncRegistry & AsyncRegistry
