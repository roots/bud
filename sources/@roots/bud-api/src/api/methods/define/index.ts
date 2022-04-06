import type {Bud} from '@roots/bud-framework'
import type {DefinePlugin} from 'webpack'

export interface define {
  (this: Bud, values: DefinePlugin['definitions']): Bud
}

export function define(
  this: Bud,
  values: DefinePlugin['definitions'],
): Bud {
  this.extensions.get('webpack-define-plugin').mutateOptions(options => {
    Object.entries(values).forEach(([k, v]) => {
      options.set(k, v)
    })

    return options
  })

  return this
}
