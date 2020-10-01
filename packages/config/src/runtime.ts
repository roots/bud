import Bud from '@roots/bud-types'

const defaultName = (entrypoint: any): string =>
  `runtime/${entrypoint.name}`

export const runtime: Bud.Config.Runtime = function (
  name: Bud.Config.Runtime['name'],
) {
  this.store['features'].set('runtimeChunk', true)

  name &&
    this.store['webpack'].set(
      'optimization.runtimeChunk.name',
      name ?? defaultName,
    )

  return this
}
