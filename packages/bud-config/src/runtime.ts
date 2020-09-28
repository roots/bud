import Bud from '@roots/bud-types'

export const runtime: Bud.Config.Runtime = function (args?) {
  this.features.set('runtimeChunk', true)

  args?.name &&
    this.options.set(
      'webpack.optimization.runtimeChunk.name',
      args.name,
    )

  return this
}
