import type {Configuration} from '@roots/bud-support/webpack'

import type {Service as BaseService} from '../../../service.js'

/**
 * Cache service Interface
 */
export interface Service extends BaseService {
  /**
   * Cache name
   */
  name: string

  /**
   * Enabled?
   */
  enabled: boolean

  /**
   * Cache type
   */
  type: 'memory' | 'filesystem'

  /**
   * Cache version
   */
  version: string

  /**
   * Cache directory
   */
  cacheDirectory: string

  /**
   * Cache configuration
   */
  configuration: Configuration['cache']

  flush: () => Promise<void>
}
