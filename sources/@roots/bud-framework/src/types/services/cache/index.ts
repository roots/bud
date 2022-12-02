import type {Configuration} from '@roots/bud-support/webpack'

import type {Service as BaseService} from '../../../service.js'

/**
 * Cache service Interface
 *
 * @public
 */
export interface Service extends BaseService {
  /**
   * Cache name
   *
   * @public
   */
  name: string

  /**
   * Enabled?
   *
   * @public
   */
  enabled: boolean

  /**
   * Cache type
   *
   * @public
   */
  type: 'memory' | 'filesystem'

  /**
   * Build dependencies
   *
   * @public
   */
  buildDependencies: Record<string, Array<string>>

  /**
   * Cache version
   *
   * @public
   */
  version: string

  /**
   * Cache directory
   *
   * @public
   */
  cacheDirectory: string

  /**
   * Cache configuration
   *
   * @public
   */
  configuration: Configuration['cache']

  /**
   * Memory cache configuration
   *
   * @public
   */
  memoryCache: Configuration['cache']

  /**
   * Filesystem cache configuration
   *
   * @public
   */
  filesystemCache: Configuration['cache']

  flush: () => void
}
