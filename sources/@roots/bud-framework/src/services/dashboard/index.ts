import type {StatsCompilation} from 'webpack'

import type {Service as Base} from '../../service.js'

/**
 * Dashboard service container
 *
 * @public
 */
export interface Service extends Base {
  progress: any

  log(...strings: Array<string>): unknown

  progressCallback(percent: number, scope: string, ...message: any[]): void

  /**
   * Render the dashboard
   *
   * @returns void
   *
   * @public
   */
  stats({stats}: {stats: StatsCompilation}): Promise<unknown>
}
