import type {InlineManifest, Bud} from './types'

const inlineManifest: InlineManifest = function (arg0?: {
  enabled: boolean
  name: string
}): Bud {
  this.features.set(
    'inlineManifest',
    arg0?.enabled !== undefined ? arg0.enabled : true,
  )
  this.options.set('inlineManifest', {name: arg0?.name ?? 'runtime'})

  return this
}

export {inlineManifest}
