import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-support/webpack'

import {bail} from './bail.js'
import {cache} from './cache.js'
import {context} from './context.js'
import {dependencies} from './dependencies.js'
import {devtool} from './devtool.js'
import {entry} from './entry.js'
import {experiments} from './experiments.js'
import {externals} from './externals.js'
import {externalsType} from './externalsType.js'
import {infrastructureLogging} from './infrastructureLogging.js'
import {loader} from './loader.js'
import {mode} from './mode.js'
import {module} from './module.js'
import {name} from './name.js'
import {node} from './node.js'
import {optimization} from './optimization.js'
import {output} from './output/index.js'
import {parallelism} from './parallelism.js'
import {performance} from './performance.js'
import {plugins} from './plugins.js'
import {profile} from './profile.js'
import {recordsPath} from './recordsPath.js'
import {resolve} from './resolve.js'
import {snapshot} from './snapshot.js'
import {stats} from './stats.js'
import {target} from './target.js'

export {
  bail,
  cache,
  context,
  dependencies,
  devtool,
  entry,
  experiments,
  externals,
  externalsType,
  infrastructureLogging,
  loader,
  mode,
  module,
  name,
  node,
  optimization,
  output,
  parallelism,
  performance,
  plugins,
  profile,
  recordsPath,
  resolve,
  snapshot,
  stats,
  target,
}

export interface Factory<
  Key extends keyof Config,
  Config = Configuration,
> {
  (app: Bud): Promise<Config[Key]>
}

export type Records<Config = Configuration> = {
  [Key in keyof Config as `${Key & string}`]: Factory<Key, Config>
}
