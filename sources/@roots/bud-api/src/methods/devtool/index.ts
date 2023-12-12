import type {Configuration} from '@roots/bud-framework/config'

import {Bud} from '@roots/bud-framework'
import isUndefined from '@roots/bud-support/isUndefined'

export type Parameters = [(Bud | Configuration['devtool'])?]

export interface devtool {
  (...devtool: Parameters): Promise<Bud>
}

export interface facade {
  (...devtool: Parameters): Bud
}

export const devtool: devtool = async function (
  this: Bud,
  input?: Parameters[0],
) {
  const FALLBACK_SOURCEMAP = this.isDevelopment ? `eval` : `source-map`

  if (input instanceof Bud) {
    this.hooks.on(`build.devtool`, FALLBACK_SOURCEMAP)

    this.api.logger.success(`bud.devtool:`, `devtool set to`, input)

    return this
  }

  this.hooks.on(
    `build.devtool`,
    !isUndefined(input) ? input : FALLBACK_SOURCEMAP,
  )

  this.api.logger.success(
    `bud.devtool`,
    `devtool set to`,
    input ?? FALLBACK_SOURCEMAP,
  )

  return this
}
