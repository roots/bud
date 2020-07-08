/**
 * Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.
 */
export type hash = (arg0: any, arg1: {
    boolean;
}) => {
    bud: {
        import();
    };
};
/**
 * Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.
 * @example bud.hash(true) // enable
 * @typedef {function (enabled: {boolean}) => {bud: {import('./../index')}} hash
 * @param   {boolean} enabled - true to enable filename hashing.
 * @return  {import('./../index')} bud
 */
export function hash(enabled: boolean): import('./../index');
//# sourceMappingURL=hash.d.ts.map