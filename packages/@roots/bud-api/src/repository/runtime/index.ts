/**
 * @module @roots/bud-api
 */

import {isUndefined} from 'lodash'
import type {Configuration, EntryObject} from 'webpack'

import type Repository from '..'

/**
 * @const DEFAULT_OPTIONS
 *
 * Default options for runtime if no options are passed as parameters.
 */
const DEFAULT_OPTIONS: Configuration['optimization']['runtimeChunk'] =
  {
    name: (entrypoint: EntryObject) =>
      `runtime/${entrypoint.name}`,
  }

/**
 * @function runtime
 */
const runtime: Repository.Runtime = function (runtime?) {
  this.hooks.on('build/optimization/runtimeChunk', () =>
    !isUndefined(runtime) ? runtime : DEFAULT_OPTIONS,
  )

  return this
}

/**
 * @exports runtime
 */
export {runtime}
