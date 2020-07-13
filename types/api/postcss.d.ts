/**
 * Configure PostCSS.
 *
 * If you prefer, you may utilize a postcss.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 */
export type postCss = (arg0: {
    enabled: boolean;
    plugins: any[];
}) => {
    bud: typeof import('./../index');
};
/**
 * Configure PostCSS.
 *
 * If you prefer, you may utilize a postcss.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 *
 * @typedef {function ({enabled: boolean, plugins: array}) => {bud: typeof import('./../index')}} postCss
 * @param   {{enabled: boolean, plugins: array}} options
 * @param   {boolean}  options.enabled
 * @param   {array}    options.plugins
 * @return  {typeof import('./../index')} bud
 */
export function postCss({ enabled, ...options }: {
    enabled: boolean;
    plugins: any[];
}): typeof import('./../index');
//# sourceMappingURL=postcss.d.ts.map