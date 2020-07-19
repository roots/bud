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
const setEnv = function (options) {
  this.options.env = {
    ...this.options.env,
    ...options,
  }

  return this
}

export {setEnv}
