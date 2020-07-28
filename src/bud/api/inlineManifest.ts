import type {InlineManifest, Bud} from './types'

const inlineManifest: InlineManifest = function (name: string): Bud {
  this.state.features.inlineManifest = true

  if (this.state.features.inlineManifest) {
    this.state.options.inlineManifest = {
      ...this.state.options.inlineManifest,
      name: name || 'runtime',
    }
  }

  return this
}

export {inlineManifest}
