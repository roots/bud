import type {Bud} from '@roots/bud-framework'
import type {Optimization} from '@roots/bud-framework/types/config'

export type Parameters = [
  | undefined
  | Optimization.RuntimeChunk
  | ((
      runtime: Optimization.RuntimeChunk | undefined,
    ) => Optimization.RuntimeChunk),
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
