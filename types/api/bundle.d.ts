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
 * @param   {string} name - output name.
 * @param   {array}  entries - array of src assets to include in the bundle.
 * @return  {typeof import('./../index')} bud
 */
export function bundle(name: string, entries: any[]): typeof import('./../index');
