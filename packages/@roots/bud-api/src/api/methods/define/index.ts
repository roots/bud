import type {Framework} from '@roots/bud-framework'
import type {DefinePlugin} from 'webpack'

export interface define {
  (
    this: Framework,
    values: DefinePlugin['definitions'],
  ): Framework
}

export function define(
  this: Framework,
  values: DefinePlugin['definitions'],
): Framework {
  const options = this.extensions.get(
    'webpack-define-plugin',
  ).options

  Object.entries(values).forEach(([k, v]) => {
    options.set(k, v)
  })

  return this
}
