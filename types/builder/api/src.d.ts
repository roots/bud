/**
 * Yield an absolute path from a path relative to the src dir.
 */
export type src = (
  arg0: any,
  arg1: string,
) => {
  absolutePath: string
}
/**
 * Yield an absolute path from a path relative to the src dir.
 * @example bud.src('scripts/app.js') // absolute path to the source file
 * @typedef {function (relativePath: string) => {absolutePath: string}} src
 * @param   {string} relativePath - relative path
 * @return  {string} absolutePath
 */
export function src(relativePath: string): string
//# sourceMappingURL=src.d.ts.map
