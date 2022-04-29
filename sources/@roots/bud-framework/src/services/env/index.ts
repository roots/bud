import {ContainerService} from '../../service'

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
