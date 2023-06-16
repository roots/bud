import type {Service as Contract} from '@roots/bud-framework'
import type {
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/types/config'

/**
 * Dashboard service container
 */
export interface Service extends Contract {
  /**
   * Format stats errors
   */
  formatStatsErrors: (stats: StatsError[]) => StatsError[]

  /**
   * IDs of rendered stats for debouncing
   */
  hashes: Set<string>

  /**
   * Render stats fully
   */
  render: any

  /**
   * Render queued messages
   */
  renderQueuedMessages(): Promise<void>

  /**
   * Render string to stdout
   */
  renderString(stats: string): void

  /**
   * Silent mode is enabled?
   */
  silent: boolean

  /**
   * Update the dashboard
   */
  update(stats: StatsCompilation): Promise<this>
}
