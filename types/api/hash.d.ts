/**
 * Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.
 */
export type hash = (arg0: any, arg1: boolean) => {
    bud: typeof import('./../index');
};
/**
 * Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.
 * @example bud.hash(true) // enable
 * @typedef {function (enabled: boolean) => {bud: typeof import('./../index')}} hash
 * @param   {boolean} enabled - true to enable filename hashing.
 * @return  {typeof import('./../index')} bud
 */
export function hash(enabled?: boolean): typeof import('./../index');
//# sourceMappingURL=hash.d.ts.map