/**
 * Set environment variables.
 */
export type setEnv = (arg0: {
    [envvar: string]: any;
}, arg1: string[]) => {
    bud: import('../index');
};
/**
 * Set environment variables.
 * @example bud.setEnv({APP_NAME: 'sage'})
 * @typedef {function ({[envvar: string]: value: string[]}) => {bud: import('../index')}} setEnv
 * @param   {{[envvar: string]: {value: string}}} options
 * @return  {import('../index')}
 */
export function setEnv(options: {
    [envvar: string]: {
        value: string;
    };
}): import('../index');
//# sourceMappingURL=setEnv.d.ts.map