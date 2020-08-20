import type {Bud} from './types'

type InlineManifest = (args?: {enabled: boolean; name: string}) => Bud

const inlineManifest: InlineManifest = function ({
  enabled = true,
  name = 'runtime',
}) {
  enabled && this.features.enable('inlineManifest')
  this.options.set('inlineManifest.name', name)

  return this
}

export {inlineManifest}
export type {InlineManifest}
