/**
 * Make a chunk to be inlined directly on the page for optimal code splitting.
 *
 * @typedef {function(name: string, {enabled: boolean}): {bud: typeof import('./../index')}} inlineManifest
 * @example bud.inlineManifest({name: 'runtime'})
 * @example bud.inlineManifest() // defaults: enabled, runtime
 * @param {string} name
 * @return {typeof import('./../index')} bud
 */
const inlineManifest = function (
  name = 'runtime',
) {
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
