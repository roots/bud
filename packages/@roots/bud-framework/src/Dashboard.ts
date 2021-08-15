/**
 * @module @roots/bud-framework
 */

import type {Instance} from 'ink'

import type {Service} from './Service'

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
  render(Component: any, title?: string): void

  /**
   * Render error
   */
  renderError(body: string, title: string): void
}
