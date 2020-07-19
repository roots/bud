/**
 * ## bud.project
 *
 * Yield an absolute path from a path relative to the `bud.projectPath`.
 *
 * ### Example
 *
 * ```js
 * bud.project('package.json') // absolute path to package.json
 * ```
 *
 * @param   {string} relativePath - relative path
 * @return  {string} absolutePath
 */
export function project(relativePath: string): string;
