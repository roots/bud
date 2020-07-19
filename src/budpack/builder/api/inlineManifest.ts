/**
 * Inline commons scripts.
 *
 * ```js
 * bud.inlineManifest({name: 'runtime'})
 * ```
 */
const inlineManifest: InlineManifest = function (options: {name: string}): bud {
  const name = options?.name || 'runtime'

  this.features.inlineManifest = true

  if (this.features.inlineManifest) {
    this.options.inlineManifest = {
      ...this.options.inlineManifest,
      name,
    }
  }

  return this
}

export {inlineManifest}

import type {bud} from '../index.d'

export interface InlineManifestOptions {
  name?: string,
}

export type InlineManifest = (InlineManifestOptions) => bud;
