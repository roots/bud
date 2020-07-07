/**
 * Configure Babel.
 *
 * If you prefer, you may utilize a babel.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 *
 * @see https://babeljs.io/docs/en/configuration
 *
 * @typedef {function ({enabled: boolean, presets: any[], plugins: any[]}) => {bud: import('./../index')}} babel
 * @param   {{enabled: boolean, presets: any[], plugins: any[]}} options
 * @param   {boolean}  options.enabled
 * @param   {any[]}    options.plugins
 * @param   {any[]}    options.presets
 * @return  {import('./../index')}
 */
const babel = function (options) {
  this.features.babel = options.enabled

  this.options.babel = {
    ...this.options.babel,
    presets: [
      ...this.options.babel.presets,
      ...(options.presets ? options.presets : []),
    ],
    plugins: [
      ...this.options.babel.plugins,
      ...(options.plugins ? options.plugins : []),
    ],
  }

  return this
}

export {babel}
