import type {Framework} from '@roots/bud-framework'

export interface provide {
  (packages?: Record<string, Array<string>>): Framework
}

export const provide: provide = function (
  packages: Record<string, Array<string>>,
) {
  this as Framework

  this.extensions.get('webpack-provide-plugin').mutateOptions(options => {
    Object.entries(packages).forEach(([k, v]) => {
      v.forEach(alias => {
        options.set(alias, k)
      })
    })

    return options
  })

  return this
}
