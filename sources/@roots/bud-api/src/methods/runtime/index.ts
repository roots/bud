import type {Optimization} from '@roots/bud-framework/config'

import {Bud} from '@roots/bud-framework'
import {BudError} from '@roots/bud-support/errors'
import isObject from '@roots/bud-support/isObject'

export type Parameters = [
  | ((
      runtime: Optimization.RuntimeChunk | undefined,
    ) => Optimization.RuntimeChunk)
  | Bud
  | Optimization.RuntimeChunk,
]

export interface runtime {
  (...parameters: Parameters): Promise<Bud>
}

export const runtime: runtime = async function (
  this: Bud,
  runtime = `single`,
) {
  if (
    runtime !== `single` &&
    runtime !== `multiple` &&
    typeof runtime !== `boolean` &&
    !(runtime instanceof Bud) &&
    !(isObject(runtime) && `name` in runtime)
  ) {
    throw BudError.normalize(
      `bud.runtime: invalid value "${runtime}". Must be a boolean, "single", or "multiple".`,
      {
        docs: new URL(`https://bud.js.org/reference/bud.runtime`),
        thrownBy: import.meta.url,
      },
    )
  }

  const value =
    runtime instanceof Bud || runtime === true ? `single` : runtime

  this.hooks.on(`build.optimization.runtimeChunk`, value)

  this.api.logger.log(`bud.runtime:`, `set to`, value)

  return this
}
