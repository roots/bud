import type {StatsCompilation} from '@roots/bud-support/webpack'

import type {Service as Base} from '../../../service.js'

/**
 * Dashboard service container
 *
 * @public
 */
export interface Service extends Base {
  instance: any

  /**
   * Render the dashboard
   *
   * @returns void
   *
   * @public
   */
  stats(stats: StatsCompilation): Promise<unknown>
}
