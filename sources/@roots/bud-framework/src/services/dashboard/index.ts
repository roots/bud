import type {StatsCompilation} from 'webpack'

import type {Service as Base} from '../../service.js'

/**
 * Dashboard service container
 *
 * @public
 */
export interface Service extends Base {
  instance: any

  log(...strings: Array<string>): unknown

  /**
   * Render the dashboard
   *
   * @returns void
   *
   * @public
   */
  stats({stats}: {stats: StatsCompilation}): Promise<unknown>
}
