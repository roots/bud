import type {Bud} from '@roots/bud-framework'
import type {Configuration, EntryObject} from '@roots/bud-framework/config'

export interface runtime {
  (runtime: Configuration['optimization']['runtimeChunk']): Bud
}

/**
 * Default options for runtime if no options are passed as parameters.
 */
const DEFAULT_RUNTIME: Configuration['optimization']['runtimeChunk'] = {
  name: (entrypoint: EntryObject) => `runtime/${entrypoint.name}`,
}

export const runtime: runtime = function (runtime = DEFAULT_RUNTIME) {
  const app = this as Bud

  app.hooks.on(
    `build.optimization.runtimeChunk`,
    runtime === true ? DEFAULT_RUNTIME : runtime,
  )

  return app
}
