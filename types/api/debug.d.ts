/**
 * Debug mode
 */
export type debug = (arg0: any, arg1: boolean) => {
    bud: typeof import('./../index');
};
/**
 * Debug mode
 * @typedef {function (enabled: boolean) => {bud: typeof import('./../index')}} debug
 * @param   {boolean} enabled - true to enable debug mode
 * @return  {typeof import('./../index')} debug
 */
export function debug(enabled: boolean): typeof import('./../index');
//# sourceMappingURL=debug.d.ts.map