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
 * @param   {{enabled: boolean, presets: any[], plugins: any[]}} options
 * @param   {any[]}    options.plugins
 * @param   {any[]}    options.presets
 * @return  {typeof import('./../index')} bud
 */
const babel = function (options) {
  this.features.babel = true

  this.options.babel = {
    ...(this.options.babel ? this.options.babel : {}),
    presets: [
      ...(this.options.babel.presets
        ? this.options.babel.presets
        : {}),
      ...(options.presets ? options.presets : {}),
    ],
    plugins: [
      ...(this.options.babel.plugins
        ? this.options.babel.plugins
        : {}),
      ...(options.plugins ? options.plugins : {}),
    ],
  }

  return this
}

export {babel}
