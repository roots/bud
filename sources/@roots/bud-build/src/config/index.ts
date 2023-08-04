import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-framework/config'

export {bail} from './bail.js'
export {cache} from './cache.js'
export {context} from './context.js'
export {dependencies} from './dependencies.js'
export {devtool} from './devtool.js'
export {entry} from './entry.js'
export {experiments} from './experiments.js'
export {externals} from './externals.js'
export {externalsType} from './externalsType.js'
export {infrastructureLogging} from './infrastructureLogging.js'
export {loader} from './loader.js'
export {mode} from './mode.js'
export {module} from './module.js'
export {name} from './name.js'
export {node} from './node.js'
export {optimization} from './optimization.js'
export {output} from './output/index.js'
export {parallelism} from './parallelism.js'
export {performance} from './performance.js'
export {plugins} from './plugins.js'
export {profile} from './profile.js'
export {recordsPath} from './recordsPath.js'
export {resolve} from './resolve.js'
export {resolveLoader} from './resolveLoader.js'
export {snapshot} from './snapshot.js'
export {stats} from './stats.js'
export {target} from './target.js'

export interface Factory<
  Key extends keyof Config,
  Config = Configuration,
> {
  (app: Bud): Promise<Config[Key] | undefined>
}

export type Records<Config = Configuration> = {
  [Key in keyof Config as `${Key & string}`]: Factory<Key, Config>
}
