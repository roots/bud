/**
 * API builder: babel
 *
 * @type   {func.<makeBabel>}
 * @param  {object.<bud>}
 * @return {func.<babel>}
 */
const makeBabel = bud => {
  /**
   * Configure Babel.
   *
   * If you prefer, you may utilize a babel.config.js file in the project root,
   * either alongside or in lieue of this configuration.
   *
   * Conflicts between supplied configs will be resolved in favor of bud.config.js.
   *
   * @typedef {func.<babel>}
   * @param   {object.<array, array>} {@link https://babeljs.io/docs/en/configuration}
   * @return  {object.<bud>}
   */
  const babel = ({enabled = true, presets, plugins}) => {
    bud.features.babel = enabled

    bud.options.babel = {
      ...bud.options.babel,
      presets: [
        ...bud.options.babel.presets,
        ...(presets ? presets : []),
      ],
      plugins: [
        ...bud.options.babel.plugins,
        ...(plugins ? plugins : []),
      ],
    }

    return bud
  }

  return babel
}

export {makeBabel}
