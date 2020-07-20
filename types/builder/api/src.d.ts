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
 * @param   {string} relativePath - relative path
 * @return  {string} absolutePath
 */
export function src(relativePath: string): string;
