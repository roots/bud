/**
 * Make API: postcss
 *
 * @type   {func.<makePostCss>}
 * @param  {object.<bud>}
 * @return {void}
 */
const makePostCss = bud => {
  /**
   * Configure PostCSS.
   *
   * If you prefer, you may utilize a postcss.config.js file in the project root,
   * either alongside or in lieue of this configuration.
   *
   * Conflicts between supplied configs will be resolved in favor of bud.config.js.
   *
   * @param  {object.<array, array>} {@link https://github.com/postcss/postcss#options}
   * @return {object.<bud>} bud instance
   */
  const postCss = ({enabled = true, ...config}) => {
    ! enabled
      ? bud.features.postCss = enabled
      : bud.options.postCss = {
          ...bud.options.postCss,
          ...(config ? config : []),
          plugins: [
            ...bud.options.postCss.plugins,
            ...(config.plugins ? config.plugins : []),
          ],
        }

    return bud
  }

  return postCss
}

export {makePostCss}