/**
 * Configure Babel.
 *
 * If you prefer, you may utilize a babel.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 */
export type babel = (arg0: {
  enabled: boolean
  presets: any[]
  plugins: any[]
}) => {
  bud: typeof import('./../index')
}
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
 * @typedef {function ({enabled: boolean, presets: any[], plugins: any[]}) => {bud: typeof import('./../index')}} babel
 * @param   {{enabled: boolean, presets: any[], plugins: any[]}} options
 * @param   {any[]}    options.plugins
 * @param   {any[]}    options.presets
 * @return  {typeof import('./../index')} bud
 */
export function babel(options: {
  enabled: boolean
  presets: any[]
  plugins: any[]
}): typeof import('./../index')
//# sourceMappingURL=babel.d.ts.map
