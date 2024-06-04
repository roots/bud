import type {MultiStats, StatsError} from '@roots/bud-framework/config'
import type {BudError} from '@roots/bud-support/errors'

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

  /**
   * Render error
   */
  renderError: (error: BudError) => any
}
