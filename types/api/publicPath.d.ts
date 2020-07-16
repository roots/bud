/**
 * ## bud.publicPath
 *
 * Set the project public path.
 *
 * ### Example
 *
 * ```js
 * bud.publicPath('dist')
 * ```
 */
export type publicPath = (
  arg0: any,
  arg1: string,
) => {
  bud: typeof import('./../index')
}
/**
 * ## bud.publicPath
 *
 * Set the project public path.
 *
 * ### Example
 *
 * ```js
 * bud.publicPath('dist')
 * ```
 *
 * @typedef {function (dir: string) => {bud: typeof import('./../index')}} publicPath
 * @param   {string} dir - public path of project
 * @return  {typeof import('./../index')} bud
 */
export function publicPath(
  dir: string,
): typeof import('./../index')
//# sourceMappingURL=publicPath.d.ts.map
