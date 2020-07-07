/**
 * Set the project's dist directory.
 */
export type distPath = (
  arg0: any,
  arg1: {
    string
  },
) => {
  bud: import('./../index')
}
/**
 * Set the project's dist directory.
 * @example bud.distPath('dist') // default unless specified
 * @typedef {function (dir: {string}) => {bud: import('./../index')}} distPath
 * @param   {string} dir - path of dist directory relative to the project root.
 * @return  {import('./../index')} bud
 */
export function distPath(dir: string): import('./../index')
//# sourceMappingURL=distPath.d.ts.map
