import type {ServiceContainer} from '../../service.js'

/**
 * Env container interface
 *
 * @public
 */
export interface Service extends ServiceContainer {
  /**
   * Get public environment variables
   *
   * @public
   */
  getPublicEnv(): Record<string, any>
}
