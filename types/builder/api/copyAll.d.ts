/**
 * Copy all files from a specified source to a specified destination.
 */
export type copyAll = (arg0: any, arg1: {
    string;
}, arg2: any, arg3: {
    string;
}) => {
    bud: typeof import('./../index');
};
/**
 * Copy all files from a specified source to a specified destination.
 * @example   bud.copyAll(bud.src('images'), bud.dist('images'))
 * @typedef   {function (src: {string}, dest: {string}) => {bud: typeof import('./../index')}} copyAll
 * @param     {string} src  - origin dir
 * @param     {string} dest - destination dir
 * @return    {typeof import('./../index')} bud
 */
export function copyAll(src: string, dest: string): typeof import('./../index');
//# sourceMappingURL=copyAll.d.ts.map