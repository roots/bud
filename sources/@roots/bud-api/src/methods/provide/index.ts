import type {Bud} from '@roots/bud-framework'

export interface provide {
  (packages?: Record<string, Array<string>>): Bud
}

export const provide: provide = function (
  packages: Record<string, Array<string>>,
) {
  const app = this as Bud

  app.extensions.get('webpack:provide-plugin').setOptions(options => {
    Object.entries(packages).forEach(([key, alias]) => {
      ;(Array.isArray(alias) ? alias : [alias]).forEach(alias => {
        options[alias] = key
      })
    })

    return options
  })

  return app
}
