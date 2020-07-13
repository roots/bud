/**
 * Set the build target.
 */
export type target = (
  arg0: never,
  arg1: string,
) => {
  bud: typeof import('./../index')
}
/**
 * Set the build target.
 * @example bud.target('web') // default
 * @typedef {function (name: string) => {bud: typeof import('./../index')}} target
 * @param   {string} dir - path of src directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
export function target(
  target: any,
): typeof import('./../index')
//# sourceMappingURL=target.d.ts.map
