/**
 * Enable or disable hot module reloading
 */
export type hot = (arg0: any, arg1: {
    boolean;
}) => {
    bud: import('./../index');
};
/**
 * Enable or disable hot module reloading
 * @example bud.hot(true) // enable HMR
 * @typedef {function (enabled: {boolean}) => {bud: import('./../index')}} hot
 * @param   {boolean} enabled - true to enable hot module reloading. default: !bud.inProduction.
 * @return  {import('./../index')} bud
 */
export function hot(enabled: boolean): import('./../index');
//# sourceMappingURL=hot.d.ts.map