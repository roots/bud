import type {StatsCompilation} from 'webpack'

import type {Service as Base} from '../../service.js'

/**
 * Dashboard service container
 *
 * @public
 */
export interface Service extends Base {
  progress: any

  progressCallback(percent: number, scope: string, ...message: any[]): void

  update(): this

  /**
   * Render the dashboard
   *
   * @returns void
   *
   * @public
   */
  stats({
    stats,
    errors,
    warnings,
  }: {
    stats: StatsCompilation
    errors: any[]
    warnings: any[]
  }): this
}
