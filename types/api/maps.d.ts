/**
 * ## bud.map
 *
 * Enable or disable source-maps
 *
 * ### Example
 *
 * ```js
 * bud.map(true)
 * ```
 */
export type maps = (arg0: any, arg1: boolean) => {
    bud: import('./../index');
};
/**
 * ## bud.map
 *
 * Enable or disable source-maps
 *
 * ### Example
 *
 * ```js
 * bud.map(true)
 * ```
 *
 * @typedef {function (enabled: boolean) => {bud: import('./../index')}} maps
 * @param   {boolean} mapsEnabled - true to enable source-maps. default: !bud.inProduction.
 * @return  {bud} bud
 */
export function maps(enabled: any): any;
//# sourceMappingURL=maps.d.ts.map