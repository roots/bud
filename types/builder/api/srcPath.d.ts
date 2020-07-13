/**
 * Set the project's src directory.
 */
export type srcPath = (
  arg0: any,
  arg1: string,
) => {
  bud: typeof import('./../index')
}
/**
 * Set the project's src directory.
 * @example bud.srcPath('src') // default unless specified
 * @typedef {function (dir: string) => {bud: typeof import('./../index')}} srcPath
 * @param   {string} dir - path of src directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
export function srcPath(
  src: any,
): typeof import('./../index')
//# sourceMappingURL=srcPath.d.ts.map
