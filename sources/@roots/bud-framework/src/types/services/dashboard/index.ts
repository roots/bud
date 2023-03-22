import type {MultiStats} from '@roots/bud-support/webpack'

import type {Service as Contract} from '../../../service.js'

/**
 * Dashboard service container
 */
export interface Service extends Contract {
  silent: boolean

  renderLog?: any

  /**
   * Update the dashboard
   */
  update(stats: MultiStats): Promise<this>

  /**
   * Render stats fully
   */
  render: any

  renderString(stats: MultiStats): void
}
