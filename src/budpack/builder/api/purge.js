/**
 * API Builder: purge
 *
 * @typedef {func.<makePurge>}
 * @param   {object.<bud>}
 * @return  {void}
 */
const makePurge = bud => {
  /**
   * Purge unused CSS from bundles.
   *
   * @see    {@link https://purgecss.com/guides/wordpress.html}
   * @param  {Object} - purgecss config {@link https://purgecss.com/configuration.html}
   * @return {object.<bud>}
   */
  const purge = ({enabled = true, ...config}) => {
    bud.features.purge = enabled

    bud.features.purge && (() => {
      bud.options.postCss = {
        ...bud.options.postCss,
        plugins: [
          ...bud.options.postCss.plugins,
          require('@fullhuman/postcss-purgecss')({...config}),
        ],
      }
    })()

    return bud
  }

  return purge
}

export {makePurge}
