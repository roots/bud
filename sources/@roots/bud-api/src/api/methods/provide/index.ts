import type {Bud} from '@roots/bud-framework'

export interface provide {
  (packages?: Record<string, Array<string>>): Bud
}

export const provide: provide = function (
  packages: Record<string, Array<string>>,
) {
  const ctx = this as Bud

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
