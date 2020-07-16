/**
 * ## bud.copy
 *
 * Copy a file.
 *
 * ```js
 * bud.copy(
 *    bud.src('images/image.png'),
 *    bud.dist('image.png'),
 * )
 * ```
 */
export type copy = (arg0: any, arg1: {
    string;
}, arg2: any, arg3: {
    string;
}) => {
    bud: typeof import('./../index');
};
/**
 * ## bud.copy
 *
 * Copy a file.
 *
 * ```js
 * bud.copy(
 *   bud.src('images/image.png'),
 *   bud.dist('image.png'),
 * )
 * ```
 *
 * @typedef   {function (from: {string}, to: {string}) => {bud: typeof import('./../index')}} copy
 * @param     {string} src - path to copy from
 * @param     {string} dist - path to copy to
 * @return    {typeof import('./../index')} bud
 */
export function copy(from: any, to: any): typeof import('./../index');
//# sourceMappingURL=copy.d.ts.map