/**
 * @module @roots/bud-framework
 */

import type {Service} from './Service'
import type {Instance} from 'ink'

/**
 * @interface Dashboard
 */
export interface Dashboard extends Service {
  /**
   * Ink instance
   */
  instance: Instance

  /**
   * Mount and instantiate Dashboard
   */
  run(): void

  /**
   * Render stdout
   */
  render(Component: any, title?: string): Instance

  /**
   * Render error
   */
  renderError(body: string, title: string): Instance
}
