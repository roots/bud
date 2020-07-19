import {bud} from '../bud'

interface inlineManifestInterface {
  (name?: string): bud;
}

type InlineManifest = inlineManifestInterface;

/**
 * Make a chunk to be inlined directly on the page for optimal code splitting.
 *
 * ```js
 * bud.inlineManifest({name: 'runtime'})
 * ```
 */
const inlineManifest: InlineManifest = function (name?: string): bud {
  this.features.inlineManifest = true

  if (this.features.inlineManifest) {
    this.options.inlineManifest = {
      ...this.options.inlineManifest,
      name: name || 'runtime',
    }
  }

  return this
}

export {inlineManifest}
