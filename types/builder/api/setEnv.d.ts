/**
 * ## bud.setEnv
 *
 * Set environment variables.
 *
 * ```js
 * bud.setEnv({
 *  APP_NAME: 'sage',
 *  //...,
 * })
 * ```
 *
 * @param   {{[envvar: string]: {value: string}}} options
 * @return  {typeof import('./../index')}
 */
export function setEnv(options: {
    [envvar: string]: {
        value: string;
    };
}): typeof import('./../index');
