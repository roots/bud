import type {Bud} from '@roots/bud-framework'
import type {DefinePlugin} from '@roots/bud-support/webpack'

export type Parameters = [DefinePlugin['definitions']]

export interface define {
  (...values: Parameters): Bud
}

export function define(
  this: Bud,
  values: DefinePlugin['definitions'],
): Bud {
  this.extensions
    .get(`@roots/bud-extensions/webpack-define-plugin`)
    ?.setOptions((definitions: DefinePlugin['definitions']) => ({
      ...(definitions ?? {}),
      ...values,
    }))

  return this
}
