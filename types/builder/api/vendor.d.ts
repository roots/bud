/**
 * Enable or disable vendor bundles.
 */
export type vendor = (arg0: any, arg1: {
    boolean;
}) => {
    bud: typeof import('./../index');
};
/**
 * Enable or disable vendor bundles.
 *
 * @example bud.hash(true) // enable
 * @typedef {function (enabled: {boolean}) => {bud: typeof import('./../index')} vendor
 * @param   {boolean} enabled - true to enable vendor bundle.
 * @return  {bud: typeof import('./../index')} bud
 */
export function vendor(enabled: boolean): any;
//# sourceMappingURL=vendor.d.ts.map