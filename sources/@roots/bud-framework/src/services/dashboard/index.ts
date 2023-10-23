import type {
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'

/**
 * Dashboard service container
 */
export interface Dashboard {
  /**
   * Received stats
   */
  stats?: StatsCompilation

  /**
   * Format stats errors
   */
  formatStatsErrors: (
    errors: StatsError[] | undefined,
  ) => StatsError[] | undefined

  /**
   * Render function
   */
  render: (stats?: StatsCompilation, error?: any) => any

  /**
   * Render string to stdout
   */
  renderString(stats: string): any
}
