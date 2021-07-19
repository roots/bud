/**
 * @module @roots/bud-framework
 */

import {Service} from './Service'

/**
 * @interface Api
 */
interface Api extends Service {
  bindMethod(acc, [name, fn]: [string, CallableFunction]): void
}

export {Api}
