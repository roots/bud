import type {MultiStats} from '@roots/bud-support/webpack'

import type {Service as Contract} from '../../../service.js'

/**
 * Dashboard service container
 */
export interface Service extends Contract {
  silent: boolean

  /**
   * IDs of rendered stats for debouncing
   */
  hashes: Set<string>

  /**
   * Update the dashboard
   */
  update(stats: MultiStats): Promise<this>

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
  renderString(stats: MultiStats): void
}
