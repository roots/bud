/**
 * Enable or disable hot module reloading
 */
export type hot = (
  arg0: any,
  arg1: {
    boolean
  },
) => {
  bud: typeof import('./../index')
}
/**
 * Enable or disable hot module reloading
 * @example bud.hot(true) // enable HMR
 * @typedef {function (enabled: {boolean}) => {bud: typeof import('./../index')}} hot
 * @param   {boolean} enabled - true to enable hot module reloading. default: !bud.inProduction.
 * @return  {typeof import('./../index')} bud
 */
export function hot(
  enabled: boolean,
): typeof import('./../index')
//# sourceMappingURL=hot.d.ts.map
