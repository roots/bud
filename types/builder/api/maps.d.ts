/**
 * Enable or disable source-maps
 */
export type maps = (
  arg0: any,
  arg1: boolean,
) => {
  bud: typeof import('./../index')
}
/**
 * Enable or disable source-maps
 * @typedef {function (enabled: boolean) => {bud: typeof import('./../index')}} maps
 * @param   {boolean} mapsEnabled - true to enable source-maps. default: !bud.inProduction.
 * @return  {typeof import('./../index')} bud
 */
export function maps(
  enabled: any,
): typeof import('./../index')
//# sourceMappingURL=maps.d.ts.map
