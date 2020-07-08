/**
 * Set environment variables.
 */
export type setEnv = (arg0: {
    [envvar: string]: any;
    string: any;
}[]) => {
    bud: typeof import('./../index');
};
/**
 * Set environment variables.
 * @example bud.setEnv({APP_NAME: 'sage'})
 * @typedef {function ({[envvar: string]: value: string}[]) => {bud: typeof import('./../index')}} setEnv
 * @param   {{[envvar: string]: {value: string}}} options
 * @return  {typeof import('./../index')}
 */
export function setEnv(options: {
    [envvar: string]: {
        value: string;
    };
}): typeof import('./../index');
//# sourceMappingURL=setEnv.d.ts.map