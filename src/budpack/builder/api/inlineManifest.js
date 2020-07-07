/**
 * Make a chunk to be inlined directly on the page for optimal code splitting.
 *
 * @type {function({enabled: boolean, name: string}): {bud: import('./../index')}} inlineManifest
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

  this.features.inlineManifest &&
    (() => {
      this.options.inlineManifest = {
        ...this.options.inlineManifest,
        name,
      }
    })()

  return this
}

export {inlineManifest}
