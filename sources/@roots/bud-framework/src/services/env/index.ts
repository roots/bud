import type {ServiceContainer} from '@roots/bud-framework/service'

/**
 * Env container interface
 */
export interface Env extends ServiceContainer {
  filterPublicEnv([key]: [string, string]): boolean

  /**
   * Get public environment variables
   */
  getPublicEnv(): Record<string, any>

  transformPublicEnv([rawKey, rawValue]: [string, string]): [
    string,
    string,
  ]
}
