import type {Service} from './Service'

/**
 * Dashboard service container
 *
 * @public
 */
export interface Dashboard extends Service {
  /**
   * Render the dashboard
   *
   * @returns void
   *
   * @public
   */
  stats(stats): Promise<void>
}
