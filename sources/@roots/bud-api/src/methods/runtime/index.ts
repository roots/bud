import type {Bud} from '@roots/bud-framework'
import {isUndefined} from 'lodash-es'
import type {Configuration, EntryObject} from 'webpack'

export interface runtime {
  (this: Bud, runtime?: Configuration['optimization']['runtimeChunk']): Bud
}

/**
 * Default options for runtime if no options are passed as parameters.
 */
const DEFAULT_OPTIONS: Configuration['optimization']['runtimeChunk'] = {
  name: (entrypoint: EntryObject) => `runtime/${entrypoint.name}`,
}

export const runtime: runtime = function (runtime?) {
  if (isUndefined(runtime) || runtime === true) {
    this.hooks.on(`build.optimization.runtimeChunk`, () => DEFAULT_OPTIONS)
    return this
  }

  if (runtime === false) {
    this.hooks.on(`build.optimization.runtimeChunk`, () => false)
    return this
  }

  this.hooks.on(`build.optimization.runtimeChunk`, () => runtime)
  return this
}
