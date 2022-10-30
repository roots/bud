import type {Bud} from '@roots/bud-framework'
import type {DefinePlugin} from 'webpack'

export interface define {
  (values: DefinePlugin['definitions']): Bud
}

export function define(values: DefinePlugin['definitions']): Bud {
  const bud = this as Bud

  bud.extensions
    .get(`@roots/bud-extensions/webpack-define-plugin`)
    ?.setOptions((definitions: DefinePlugin['definitions']) => ({
      ...(definitions ?? {}),
      ...values,
    }))

  return bud
}
