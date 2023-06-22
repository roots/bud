import type {Configuration} from '@roots/bud-framework/config'

/**
 * Cache service Interface
 */
export interface Cache {
  /**
   * Cache build dependencies
   */
  buildDependencies: Record<string, Array<string>>

  /**
   * Cache directory
   */
  cacheDirectory: string

  /**
   * Cache configuration
   */
  configuration: Configuration['cache']

  /**
   * Enabled?
   */
  enabled: boolean

  flush: () => Promise<void>

  /**
   * Cache name
   */
  name: string

  /**
   * Cache type
   */
  type: 'filesystem' | 'memory'

  /**
   * Cache version
   */
  version: string
}
