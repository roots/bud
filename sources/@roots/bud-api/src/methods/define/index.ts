import type {Bud} from '@roots/bud-framework'
import type {DefinePlugin} from 'webpack'

export interface define {
  (this: Bud, values: DefinePlugin['definitions']): Bud
}

export function define(
  this: Bud,
  values: DefinePlugin['definitions'],
): Bud {
  const app = this as Bud

  app.extensions.get('webpack:define-plugin').setOptions(options => ({
    ...options,
    ...values,
  }))

  return this
}
