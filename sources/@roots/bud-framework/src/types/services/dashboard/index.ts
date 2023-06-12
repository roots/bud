import type {Service as Contract} from '../../../service.js'
import type {MultiStats} from '../../config/index.js'

/**
 * Dashboard service container
 */
export interface Service extends Contract {
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
  renderString(stats: MultiStats): void

  silent: boolean

  /**
   * Update the dashboard
   */
  update(stats: MultiStats): Promise<this>
}
