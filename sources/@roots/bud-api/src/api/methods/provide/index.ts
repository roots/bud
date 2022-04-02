import type {Framework} from '@roots/bud-framework'

export interface provide {
  (packages?: Record<string, Array<string>>): Framework
}

export const provide: provide = function (
  packages: Record<string, Array<string>>,
) {
  const ctx = this as Framework

  ctx.extensions.get('webpack-provide-plugin').mutateOptions(options => {
    Object.entries(packages).forEach(([key, value]) => {
      Array.isArray(value)
        ? value.forEach(alias => {
            options.set(alias, key)
          })
        : options.set(value, key)
    })

    return options
  })

  return ctx
}
