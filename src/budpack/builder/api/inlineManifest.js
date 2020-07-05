/**
 * Make API: inlineManifest
 *
 * @type   {func.<makeInlineManifest>}
 * @param  {object.<bud>}
 * @return {void}
 */
const makeInlineManifest = bud => {
  /**
   * Make a manifest of @wordpress dependencies utilized by entrypoints.
   *
   * @typedef {func.<inlineManifest>} inlineManifest
   * @param   {object} settings
   * @return  {object.<bud>} bud instance
   */
  const inlineManifest = ({enabled = true, name = 'runtime'}) => {
    bud.features.inlineManifest = enabled

    bud.features.inlineManifest && (() => {
      bud.options.inlineManifest = {
        ...bud.options.inlineManifest,
        name,
      }
    })()

    return bud
  }

  return inlineManifest
}

export {makeInlineManifest}
