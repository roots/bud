import Bud from '@roots/bud-types'

export const bundle: Bud.Config.Bundle = function (
  this: Bud,
  name: string,
  entries: string[],
): Bud {
  this.options.merge('webpack.entry', {
    ...this.hooks.filter('api.bundle.filter', {
      [name]: entries,
    }),
  })

  return this
}
