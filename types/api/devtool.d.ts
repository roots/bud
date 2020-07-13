/**
 * Specify webpack devtool
 */
export type devtool = (arg0: devtool, arg1: string) => {
    bud: typeof import('./../index');
};
/**
 * Specify webpack devtool
 * @typedef {function (devtool: string) => {bud: typeof import('./../index')}} devtool
 * @param   {string} devtool - webpack devtool to utilize
 * @return  {typeof import('./../index')} bud
 */
export function devtool(devtool: string): typeof import('./../index');
//# sourceMappingURL=devtool.d.ts.map