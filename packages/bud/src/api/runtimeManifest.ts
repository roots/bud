import type {Bud} from './types'

type RuntimeManifest = (args?: {
  enabled: boolean
  name: string
}) => Bud

const runtimeManifest: RuntimeManifest = function (args?) {
  this.features.set('runtimeChunk', args?.enabled ?? true)
  this.options.set(
    'optimization.runtimeChunk.name',
    args?.name ?? this.options.get('optimization.runtimeChunk.name'),
  )

  return this
}

export {runtimeManifest}
export type {RuntimeManifest}
