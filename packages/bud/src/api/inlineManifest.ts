import type {Bud} from './types'

type InlineManifest = (args?: {enabled: boolean; name: string}) => Bud

const inlineManifest: InlineManifest = function (args?) {
  this.features.set('inlineManifest', args?.enabled ?? true)
  this.options.set('inlineManifest.name', args?.name ?? 'runtime')

  return this
}

export {inlineManifest}
export type {InlineManifest}
