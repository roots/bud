/**
 * Inline common scripts.
 *
 * ```js
 * bud.inlineManifest({name: 'runtime'})
 * ```
 */
const inlineManifest: InlineManifest = function (
  options,
): Bud {
  this.state.features.inlineManifest = true

  if (this.state.features.inlineManifest) {
    this.state.options.inlineManifest = {
      ...this.state.options.inlineManifest,
      name: options?.name || 'runtime',
    }
  }

  return this
}

import type {Bud} from '..'
export type InlineManifest = (options?: {
  name?: string
}) => Bud

export {inlineManifest}
