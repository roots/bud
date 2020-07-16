/**
 * ## bud.bundle
 *
 * Compile a group of assets.
 *
 * ```js
 * bud.bundle('app', [
 *    bud.src('app.js'),
 *    bud.src('app.css'),
 * ])
 * ```
 */
export type bundle = (arg0: never, arg1: {
    string;
}, arg2: any, arg3: {
    string;
}[]) => {
    bud: typeof import('./../index');
};
/**
 * ## bud.bundle
 *
 * Compile a group of assets.
 *
 * ```js
 * bud.bundle('app', [
 *   bud.src('app.js'),
 *   bud.src('app.css'),
 * ])
 * ```
 *
 * @typedef {function (name: {string}, entries: {string}[]) => {bud: typeof import('./../index')}} bundle
 * @param   {string} name - output name.
 * @param   {array}  entries - array of src assets to include in the bundle.
 * @return  {typeof import('./../index')} bud
 */
export function bundle(name: string, entries: any[]): typeof import('./../index');
//# sourceMappingURL=bundle.d.ts.map