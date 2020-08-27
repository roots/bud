import type {Bud} from './types'

type RuntimeManifest = (args?: {
  enabled: boolean
  name: string
}) => Bud

const runtimeManifest: RuntimeManifest = function (args?) {
  this.features.set('runtimeChunk', args?.enabled ?? true)
  args?.name &&
    this.options.set(
      'webpack.optimization.runtimeChunk.name',
      args.name,
    )

  return this
}

export {runtimeManifest}
export type {RuntimeManifest}
