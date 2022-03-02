import {Container} from '@roots/container'

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
  getPublicEnv(): Record<string, any>
}
