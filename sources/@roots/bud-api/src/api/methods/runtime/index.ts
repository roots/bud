import type {Framework} from '@roots/bud-framework'
import type {Configuration, EntryObject} from 'webpack'

import {isUndefined} from './runtime.dependencies'

export interface runtime {
  (
    this: Framework,
    runtime?: Configuration['optimization']['runtimeChunk'],
  ): Framework
}

/**
 * Default options for runtime if no options are passed as parameters.
 */
const DEFAULT_OPTIONS: Configuration['optimization']['runtimeChunk'] = {
  name: (entrypoint: EntryObject) => `runtime/${entrypoint.name}`,
}

export const runtime: runtime = function (runtime?) {
  if (isUndefined(runtime) || runtime === true) {
    this.hooks.on('build.optimization.runtimeChunk', () => DEFAULT_OPTIONS)
    return this
  }

  if (runtime === false) {
    this.hooks.on('build.optimization.runtimeChunk', () => false)
    return this
  }

  this.hooks.on('build.optimization.runtimeChunk', () => runtime)
  return this
}
