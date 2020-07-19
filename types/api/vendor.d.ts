/**
 * ## bud.vendor
 *
 * Enable vendor bundling.
 *
 * ```js
 * bud.vendor('vendor')
 * ```
 *
 * @param   {string} name - name of vendor output file
 * @return  {bud: typeof import('./../index')} bud
 */
export function vendor(name?: string): any;
