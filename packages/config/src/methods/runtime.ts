import {Config} from '..'

const defaultName = (entrypoint: any): string =>
  `runtime/${entrypoint.name}`

export const runtime: Config.Runtime = function (
  name: Config.Runtime['name'],
) {
  this.store['features'].set('runtimeChunk', true)

  name &&
    this.store['webpack'].set(
      'optimization.runtimeChunk.name',
      name ?? defaultName,
    )

  return this
}
