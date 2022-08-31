import type {ContainerService} from '../../service.js'

/**
 * Env container interface
 *
 * @public
 */
export interface Service extends ContainerService {
  /**
   * Get public environment variables
   *
   * @public
   */
  getPublicEnv(): Record<string, any>
}
