import type {
  Configuration,
  FileCacheOptions,
} from '@roots/bud-framework/config'

/**
 * Cache service Interface
 */
export interface Cache {
  /**
   * Cache build dependencies
   */
  buildDependencies: FileCacheOptions[`buildDependencies`]

  /**
   * Cache directory
   */
  cacheDirectory: FileCacheOptions[`cacheDirectory`]

  /**
   * Cache configuration
   */
  readonly configuration: Configuration[`cache`]

  /**
   * Enabled?
   */
  enabled: boolean

  /**
   * Flush cache
   */
  flush: () => Promise<void>

  /**
   * Cache name
   */
  name: FileCacheOptions[`name`]

  /**
   * Cache type
   */
  type: 'filesystem' | 'memory'

  /**
   * Cache version
   */
  version: FileCacheOptions[`version`]
}
