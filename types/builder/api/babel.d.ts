/**
 * Configure Babel.
 *
 * If you prefer, you may utilize a babel.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 */
export type babel = (arg0: {
    enabled: boolean;
    presets: any[];
    plugins: any[];
}) => {
    bud: import('./../index');
};
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
export function babel(options: {
    enabled: boolean;
    presets: any[];
    plugins: any[];
}): import('./../index');
//# sourceMappingURL=babel.d.ts.map