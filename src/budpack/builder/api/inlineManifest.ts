/**
 * Inline commons scripts.
 *
 * ```js
 * bud.inlineManifest({name: 'runtime'})
 * ```
 */
const inlineManifest: InlineManifest = function (options): bud {
  this.features.inlineManifest = true

  if (this.features.inlineManifest) {
    this.options.inlineManifest = {
      ...this.options.inlineManifest,
      name: options?.name || 'runtime',
    }
  }

  return this
}

import type {bud} from '../'

export type InlineManifest = (options: {name?: string}) => bud;

export {inlineManifest}
