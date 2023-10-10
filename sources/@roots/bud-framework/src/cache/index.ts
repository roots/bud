import type {
  Configuration,
  FileCacheOptions,
} from '@roots/bud-framework/config'

/**
 * Cache property callback
 */
export type CacheCallback<T = any> = ((value?: T) => T) | T

/**
 * Cache service Interface
 */
export interface Cache {
  /**
   * Allow collecting memory
   */
  allowCollectingMemory: FileCacheOptions[`allowCollectingMemory`]

  /**
   * Build dependencies
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
   * Get allowCollectingMemory
   */
  getAllowCollectingMemory(): FileCacheOptions[`allowCollectingMemory`]

  /**
   * Get build dependencies
   */
  getBuildDependencies(): FileCacheOptions[`buildDependencies`]

  /**
   * Get cache directory
   */
  getCacheDirectory(): FileCacheOptions[`cacheDirectory`]

  /**
   * Get cache type
   */
  getType(): 'filesystem' | 'memory'

  /**
   * Cache name
   */
  name: FileCacheOptions[`name`]

  setAllowCollectingMemory(
    value: CacheCallback<FileCacheOptions[`allowCollectingMemory`]>,
  ): this

  /**
   * Set build dependencies
   */
  setBuildDependencies(
    value: CacheCallback<FileCacheOptions[`buildDependencies`]>,
  ): this

  /**
   * Set cache directory
   */
  setCacheDirectory(
    value: CacheCallback<FileCacheOptions[`cacheDirectory`]>,
  ): this

  /**
   * Set cache type
   */
  setType(value: CacheCallback<FileCacheOptions[`type`]>): this

  /**
   * Cache type
   */
  type: 'filesystem' | 'memory'

  /**
   * Cache version
   */
  version: FileCacheOptions[`version`]
}
