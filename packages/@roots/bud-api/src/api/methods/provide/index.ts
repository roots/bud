import type {Framework} from '@roots/bud-framework'

export interface provide {
  (packages?: Record<string, Array<string>>): Framework
}

export const provide: provide = function (
  packages: Record<string, Array<string>>,
) {
  this as Framework

  const plugin = this.extensions.get('webpack-provide-plugin')

  Object.entries(packages).forEach(([k, v]) => {
    v.forEach(alias => {
      plugin.options.set(alias, k)
    })
  })

  return this
}
