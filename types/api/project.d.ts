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
 */
export type project = (
  arg0: any,
  arg1: string,
) => {
  absolutePath: string
}
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
 * @typedef {function (relativePath: string) => {absolutePath: string}} project
 * @param   {string} relativePath - relative path
 * @return  {string} absolutePath
 */
export function project(relativePath: string): string
//# sourceMappingURL=project.d.ts.map
