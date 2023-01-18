import type {ServiceContainer} from '../../../service.js'

/**
 * Env container interface
 */
export interface Env extends ServiceContainer {
  /**
   * Get public environment variables
   *
   * @public
   */
  getPublicEnv(): Record<string, any>

  filterPublicEnv([key]: [string, string]): boolean

  transformPublicEnv([rawKey, rawValue]: [string, string]): [
    string,
    string,
  ]
}
