/**
 * Set the project public path.
 */
export type publicPath = (arg0: any, arg1: string) => {
    bud: typeof import('./../index');
};
/**
 * Set the project public path.
 *
 * @typedef {function (dir: string) => {bud: typeof import('./../index')}} publicPath
 * @param   {string} dir - public path of project
 * @return  {typeof import('./../index')} bud
 */
export function publicPath(dir: string): typeof import('./../index');
//# sourceMappingURL=publicPath.d.ts.map