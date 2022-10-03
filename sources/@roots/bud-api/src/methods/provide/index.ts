import type {Bud} from '@roots/bud-framework'

export interface provide {
  (packages?: Record<string, Array<string>>): Bud
}

export const provide: provide = function (
  packages: Record<string, Array<string>>,
) {
  const app = this as Bud

  if (!packages) {
    throw new Error(`bud.provide: packages must be an object`)
  }

  const plugin = app.extensions.get(`webpack:provide-plugin`)
  const options = plugin.getOptions()
  const modified = Object.entries(packages).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...value.reduce((acc, inner) => ({...acc, [inner]: key}), {}),
    }),
    options ?? {},
  )

  plugin.setOptions(modified)

  return app
}
