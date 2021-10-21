import type {Framework} from '@roots/bud-framework'
import type {Configuration, EntryObject} from 'webpack'

import {isUndefined} from '../../../services/lodash'

/**
 * Runtime function interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param runtime - {@link webpack#Configuration.optimization.runtimeChunk}
 *
 * @returns {@link @roots/bud-framework#Framework}
 *
 * @hook build/optimization/runtime
 *
 * @public @config
 */
export interface runtime {
  (
    this: Framework,
    runtime?: Configuration['optimization']['runtimeChunk'],
  ): Framework
}

/**
 * Default options for runtime if no options are passed as parameters.
 */
const DEFAULT_OPTIONS: Configuration['optimization']['runtimeChunk'] =
  {
    name: (entrypoint: EntryObject) =>
      `runtime/${entrypoint.name}`,
  }

/**
 * Generate a runtime chunk intended to be inlined on the page.
 *
 * Useful for code splitting and dynamic imports.
 *
 * @example
 * ```js
 * bud.runtime()
 * ```
 *
 * @public @config
 */
export const runtime: runtime = function (runtime?) {
  this.hooks.on('build/optimization/runtimeChunk', () =>
    !isUndefined(runtime) || runtime !== true
      ? runtime
      : DEFAULT_OPTIONS,
  )

  return this
}
