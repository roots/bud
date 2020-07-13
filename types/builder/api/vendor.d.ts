/**
 * Enable or disable vendor bundles.
 */
export type vendor = (
  arg0: never | null,
  arg1: string,
) => {
  bud: typeof import('./../index')
}
/**
 * Enable or disable vendor bundles.
 *
 * @example bud.vendor('vendor') // default is 'vendor'.
 * @typedef {function (name?: string) => {bud: typeof import('./../index')} vendor
 * @param   {string} name - name of vendor output file
 * @return  {bud: typeof import('./../index')} bud
 */
export function vendor(name?: string): any
//# sourceMappingURL=vendor.d.ts.map
