import type {StatsCompilation} from 'webpack'

import type {Service as Base} from '../../service'

/**
 * Dashboard service container
 *
 * @public
 */
export interface Service extends Base {
  progressCallback(percent: number, scope: string, ...message: any[]): void

  /**
   * Render the dashboard
   *
   * @returns void
   *
   * @public
   */
  stats(stats: StatsCompilation): void
}
