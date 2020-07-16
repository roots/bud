/**
 * Dump generated webpack config for debugging
 */
export type dump = (arg0: any, arg1: boolean) => {
    bud: typeof import('./../index');
};
/**
 * Dump generated webpack config for debugging
 *
 * @example bud.dump(true) // dumps the generated webpack config and stops the build from running.
 * @typedef {function (enabled: boolean) => {bud: typeof import('./../index')}} dump
 * @param   {boolean} enabled - true to dump config
 * @return    {typeof import('./../index')} bud
 */
export function dump(enabled?: boolean): typeof import('./../index');
//# sourceMappingURL=dump.d.ts.map