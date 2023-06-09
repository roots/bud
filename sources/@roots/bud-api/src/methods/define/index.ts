import type {Bud} from '@roots/bud-framework'
import type {DefinePlugin} from '@roots/bud-framework/config'

export type Parameters = [DefinePlugin['definitions']]

export interface define {
  (...values: Parameters): Bud
}

export function define(
  this: Bud,
  values: DefinePlugin['definitions'],
): Bud {
  const define = this.extensions.get(
    `@roots/bud-extensions/webpack-define-plugin`,
  )

  Object.entries(values).forEach(([key, value]) => {
    define.set(key, value)
  })

  return this
}
