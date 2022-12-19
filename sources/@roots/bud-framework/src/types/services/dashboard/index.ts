import type {MultiStats} from '@roots/bud-support/webpack'

import type {Service as Contract} from '../../../service.js'

/**
 * Dashboard service container
 *
 * @public
 */
export interface Service extends Contract {
  silent: boolean
  renderLog?: any
  renderCompilation?: any

  /**
   * Render the dashboard
   *
   * @returns void
   *
   * @public
   */
  update(stats: MultiStats): Promise<this>
}
