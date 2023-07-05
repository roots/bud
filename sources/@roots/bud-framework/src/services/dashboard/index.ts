import type {
  StatsCompilation,
  StatsError,
} from '@roots/bud-framework/config'

interface PatchedMessage {
  message: string
  stream: 'stderr' | 'stdout'
}

/**
 * Dashboard service container
 */
export interface Dashboard {
  /**
   * Format stats errors
   */
  formatStatsErrors: (stats: StatsError[]) => StatsError[]

  /**
   * CLI instance
   */
  instance?: {
    rerender: (...args: any[]) => void
    waitUntilExit: () => Promise<any>
  }

  /**
   * Intercepted console messages
   */
  messages: Array<PatchedMessage>

  /**
   * Returns true if console is patched
   */
  patched: () => boolean

  /**
   * Render function
   */
  render: (error?: Error) => void

  /**
   * Render string to stdout
   */
  renderString(stats: string): void

  /**
   * Received stats
   */
  stats?: StatsCompilation

  /**
   * Received status
   */
  status?: false | string

  /**
   * Stderr stream
   */
  stderr: NodeJS.WriteStream & {fd: 2}

  /**
   * Stdin stream
   */
  stdin: NodeJS.ReadStream & {fd: 0}

  /**
   * Stdout stream
   */
  stdout: NodeJS.WriteStream & {fd: 1}

  /**
   * Update the stats
   */
  updateStats(stats?: StatsCompilation): Dashboard

  /**
   * Update the status message
   */
  updateStatus(status?: string): Dashboard
}
