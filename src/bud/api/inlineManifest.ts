import type {InlineManifest, Bud} from './types'

const inlineManifest: InlineManifest = function (name: string): Bud {
  this.features.enable('inlineManifest')

  this.options.merge('inlineManifest', {
    name: name || 'runtime',
  })

  return this
}

export {inlineManifest}
