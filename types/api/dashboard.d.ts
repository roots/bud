/**
 * ## bud.dashboard
 *
 * Enable or disable Bud's CLI build output.
 *
 * ## Example
 *
 * ```js
 * bud.dashboard(false) // disable dashboard
 * ```
 */
export type dashboard = (arg0: any, arg1: boolean) => {
    bud: typeof import('./../index');
};
/**
 * ## bud.dashboard
 *
 * Enable or disable Bud's CLI build output.
 *
 * ## Example
 *
 * ```js
 * bud.dashboard(false) // disable dashboard
 * ```
 *
 * @typedef {function (enabled: boolean) => {bud: typeof import('./../index')}} dashboard
 * @param   {boolean} enabled - true to enable debug mode
 * @return  {typeof import('./../index')} bud
 */
export function dashboard(enabled: boolean): typeof import('./../index');
//# sourceMappingURL=dashboard.d.ts.map