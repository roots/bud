/**
 * ## bud.vendor
 *
 * Enable vendor bundling.
 *
 * ```js
 * bud.vendor('vendor')
 * ```
 */
export type vendor = (
  arg0: never | null,
  arg1: string,
) => {
  bud: typeof import('./../index')
}
/**
 * ## bud.vendor
 *
 * Enable vendor bundling.
 *
 * ```js
 * bud.vendor('vendor')
 * ```
 *
 * @typedef {function (name?: string) => {bud: typeof import('./../index')} vendor
 * @param   {string} name - name of vendor output file
 * @return  {bud: typeof import('./../index')} bud
 */
export function vendor(name?: string): any
//# sourceMappingURL=vendor.d.ts.map
