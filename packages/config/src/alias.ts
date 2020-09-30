import Bud from '@roots/bud-types'

export const alias: Bud.Config.Alias = function (
  this: Bud,
  aliases: Bud.Framework.Repository,
) {
  const webpack = this.store.use('webpack')

  webpack.set('resolve.alias', {
    ...webpack.get('resolve.alias'),
    aliases,
  })

  return this
}
