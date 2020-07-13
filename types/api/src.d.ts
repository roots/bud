/**
 * ## bud.src
 *
 * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
 *
 * ### Example
 *
 * ```js
 * bud.src('scripts/app.js') // absolute path to the source file
 * ```
 */
export type src = (arg0: any, arg1: string) => {
    absolutePath: string;
};
/**
 * ## bud.src
 *
 * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
 *
 * ### Example
 *
 * ```js
 * bud.src('scripts/app.js') // absolute path to the source file
 * ```
 * @typedef {function (relativePath: string) => {absolutePath: string}} src
 * @param   {string} relativePath - relative path
 * @return  {string} absolutePath
 */
export function src(relativePath: string): string;
//# sourceMappingURL=src.d.ts.map