import type {
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'

/**
 * Dashboard service container
 */
export interface Dashboard {
  /**
   * Format stats errors
   */
  formatStatsErrors: (stats: StatsError[]) => StatsError[]

  /**
   * IDs of rendered stats for debouncing
   */
  hashes: Set<string>

  /**
   * CLI instance
   */
  instance?: {
    rerender: (...args: any[]) => void
    waitUntilExit: () => Promise<any>
  }

  /**
   * Render stats fully
   */
  render: any

  /**
   * Render string to stdout
   */
  renderString(stats: string): void

  /**
   * Silent mode is enabled?
   */
  silent: boolean

  /**
   * Stderr stream
   */
  stderr: NodeJS.WriteStream & {fd: 2}

  /**
   * Stdout stream
   */
  stdout: NodeJS.WriteStream & {fd: 1}

  /**
   * Update the dashboard
   */
  update(stats: StatsCompilation): this
}
