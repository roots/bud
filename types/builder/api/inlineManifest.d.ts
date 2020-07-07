/**
 * Make a chunk to be inlined directly on the page for optimal code splitting.
 *
 * @type {function({enabled: boolean, name: string}): {bud: import('./../index')}} inlineManifest
 * @param {{enabled: boolean, name: string}} options
 * @param {boolean} enabled
 * @param {string} name
 * @return {import('./../index')} bud
 */
export const inlineManifest: (arg0: {
  enabled: boolean
  name: string
}) => {
  bud: import('./../index')
}
//# sourceMappingURL=inlineManifest.d.ts.map
