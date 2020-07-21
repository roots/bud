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
 */
const setEnv = function (options: any): bud {
  this.options.env = {
    ...this.options.env,
    ...options,
  }

  return this
}

export {setEnv}
import type {bud} from '..'
