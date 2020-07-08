/**
 * Set the project base path.
 */
export type projectPath = (arg0: any, arg1: string) => {
    bud: typeof import('./../index');
};
/**
 * Set the project base path.
 * @typedef {function (dir: string) => {bud: typeof import('./../index')}}
 * @param   {string} dir - absolute path of project
 * @return  {typeof import('./../index')} bud
 */
export function projectPath(dir: string): typeof import('./../index');
//# sourceMappingURL=projectPath.d.ts.map