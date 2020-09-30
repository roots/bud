import Bud from '@roots/bud-types'

export const target: Bud.Config.Target = function (target) {
  this.options.set(
    'webpack.target',
    this.hooks.filter('api.target', target),
  )

  return this
}
