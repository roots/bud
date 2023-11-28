import type {Bud} from '@roots/bud-framework'
import type {Optimization} from '@roots/bud-framework/config'

export type Parameters = [
  | ((
      runtime: Optimization.RuntimeChunk | undefined,
    ) => Optimization.RuntimeChunk)
  | Bud
  | Optimization.RuntimeChunk
]

export interface runtime {
  (...parameters: Parameters): Promise<Bud>
}

export const runtime: runtime = async function (
  this: Bud,
  runtime = `single`,
) {
  const value = runtime instanceof this.constructor ? `single` : runtime

  this.hooks.on(
    `build.optimization.runtimeChunk`,
    value,
  )

  this.api.logger.success(`bud.runtime:`, `set to`, value)

  return this
}
