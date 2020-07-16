/**
 * Development server settings
 */
export type dev = (
  arg0: any,
  arg1: object,
) => {
  bud: typeof import('../index')
}
/**
 * Development server settings
 * @typedef {function (mode: object) => {bud: typeof import('../index')}} dev
 * @param   {object} options
 * @return  {typeof import('./../index')} bud
 */
export function dev(
  options: object,
): typeof import('./../index')
//# sourceMappingURL=dev.d.ts.map
