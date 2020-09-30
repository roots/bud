import Bud from '@roots/bud-types'

export const alias: Bud.Config.Alias = function (
  this: Bud,
  aliases: Bud.Framework.Repository,
) {
  this.options.set('webpack.resolve.alias', {
    ...this.options.get('webpack.resolve.alias'),
    ...this.hooks.filter('api.alias', aliases),
  })

  return this
}
