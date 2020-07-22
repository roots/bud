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
const setEnv = function (options: any): Bud {
  this.state.options.env = {
    ...this.state.options.env,
    ...options,
  }

  return this
}

export {setEnv}
import type {Bud} from '..'