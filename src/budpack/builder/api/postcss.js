/**
 * ## bud.postCss
 *
 * Configure PostCSS.
 *
 * If you prefer, you may utilize a postcss.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 *
 * ```js
 * bud.postCss({
 *   plugins: [
 *    require('astroturf'),
 *   ],
 * })
 *
 * @typedef {function ({enabled: boolean, plugins: array}) => {bud: typeof import('./../index')}} postCss
 * @param   {{enabled: boolean, plugins: array}} options
 * @param   {boolean}  options.enabled
 * @param   {array}    options.plugins
 * @return  {typeof import('./../index')} bud
 */
const postCss = function ({enabled = true, ...options}) {
  this.features.postCss = enabled

  if (this.features.postCss) {
    this.options.postCss = {
      ...(this.options.postCss ? this.options.postCss : {}),
      plugins: [
        ...(this.options.postCss.plugins
          ? this.options.postCss.plugins
          : []),
        ...(options.plugins ? options.plugins : []),
      ],
    }
  }

  return this
}

export {postCss}
