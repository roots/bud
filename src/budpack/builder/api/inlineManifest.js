/**
 * Make a chunk to be inlined directly on the page for optimal code splitting.
 *
 * @typedef {function({enabled: boolean, name: string}): {bud: import('./../index')}} inlineManifest
 * @example bud.inlineManifest({name: 'runtime'})
 * @example bud.inlineManifest() // defaults: enabled, runtime
 * @param {{enabled: boolean, name: string}} options
 * @param {boolean} enabled
 * @param {string} name
 * @return {import('./../index')} bud
 */
const inlineManifest = function ({
  enabled = true,
  name = 'runtime',
}) {
  this.features.inlineManifest = enabled

  if (this.features.inlineManifest) {
    this.options.inlineManifest = {
      ...this.options.inlineManifest,
      name,
    }
  }

  return this
}

export {inlineManifest}
