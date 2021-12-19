import {Container} from '@roots/container'

import {Index} from './'

/**
 * Env container interface
 *
 * @public
 */
export interface Env extends Container {
  /**
   * Get public environment variables
   *
   * @public
   */
  getPublicEnv(): Index<any>
}
