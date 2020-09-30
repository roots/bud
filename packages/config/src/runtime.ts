import Bud from '@roots/bud-types'

export const runtime: Bud.Config.Runtime = function (args?) {
  this.store['features'].set('runtimeChunk', true)

  args?.name &&
    this.store['webpack'].set(
      'optimization.runtimeChunk.name',
      args.name,
    )

  return this
}
