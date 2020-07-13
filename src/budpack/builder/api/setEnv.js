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
 * @typedef {function ({[envvar: string]: value: string}[]) => {bud: typeof import('./../index')}} setEnv
 * @param   {{[envvar: string]: {value: string}}} options
 * @return  {typeof import('./../index')}
 */
const setEnv = function (options) {
  this.options.env = {
    ...this.options.env,
    ...options,
  }

  return this
}

export {setEnv}
