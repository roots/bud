import type {Configuration} from '@roots/bud-framework/config'

import type {Service as BaseService} from '../../../service.js'

/**
 * Cache service Interface
 */
export interface Service extends BaseService {
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
