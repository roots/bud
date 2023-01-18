import type {Configuration} from '@roots/bud-support/webpack'

import type {Service as BaseService} from '../../../service.js'

/**
 * Cache service Interface
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

  flush: () => Promise<void>
}
