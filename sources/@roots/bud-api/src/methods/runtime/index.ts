import type {Bud} from '@roots/bud-framework'
import type {Optimization} from '@roots/bud-framework/types/config'

export type Parameters = [
  | ((
      runtime: Optimization.RuntimeChunk | undefined,
    ) => Optimization.RuntimeChunk)
  | Optimization.RuntimeChunk
  | undefined,
]

export interface runtime {
  (...parameters: Parameters): Promise<Bud>
}

export const runtime: runtime = async function (
  this: Bud,
  runtime = `single`,
) {
  return this.hooks.on(
    `build.optimization.runtimeChunk`,
    runtime === true ? `single` : runtime,
  )
}
