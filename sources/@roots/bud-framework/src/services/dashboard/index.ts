import type {StatsCompilation} from 'webpack'

import type {Service as Base} from '../../service'

/**
 * Dashboard service container
 *
 * @public
 */
export interface Service extends Base {
  /**
   * Render the dashboard
   *
   * @returns void
   *
   * @public
   */
  stats(stats: StatsCompilation): void
}
