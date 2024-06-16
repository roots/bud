import type {MultiStats, StatsError} from '@roots/bud-framework/config'

/**
 * Dashboard service container
 */
export interface Dashboard {
  /**
   * Format stats errors
   */
  formatStatsErrors: (
    errors: StatsError[] | undefined,
  ) => StatsError[] | undefined

  /**
   * Render function
   */
  render: (stats?: MultiStats, error?: any) => any
}
