/**
 * Copy all files from a specified source to a specified destination.
 */
export type copyAll = (
  arg0: any,
  arg1: {
    string
  },
  arg2: any,
  arg3: {
    string
  },
) => {
  bud: import('./../index')
}
/**
 * Copy all files from a specified source to a specified destination.
 * @namespace bud
 * @example   bud.copyAll(bud.src('images'), bud.dist('images'))
 * @typedef   {function (src: {string}, dest: {string}) => {bud: import('./../index')}} copyAll
 * @param     {string} src  - origin dir
 * @param     {string} dest - destination dir
 * @return    {import('./../index')} bud
 */
export function copyAll(
  src: string,
  dest: string,
): import('./../index')
//# sourceMappingURL=copyAll.d.ts.map
