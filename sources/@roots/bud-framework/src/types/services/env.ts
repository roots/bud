import type Container from '@roots/container'

import type {Service as Base} from '../../service'

/**
 * Env container interface
 *
 * @public
 */
export interface Service extends Base {
  /**
   * Get public environment variables
   *
   * @public
   */
  getPublicEnv(): Record<string, any>

  data: Container
  has: Container['has']
  isFunction: Container['isFunction']
  isString: Container['isString']
  get: Container['get']
  set: Container['set']
}
