import type Ink from 'ink'

import type {Service} from './Service'

/**
 * Dashboard service container
 *
 * @public
 */
export interface Dashboard extends Service {
  /**
   * CLI framework
   *
   * @public
   */
  instance: Ink.Instance

  stdout?: Array<string>

  stderr?: Array<string>

  /**
   * Mount and render the {@link Dashboard}
   *
   * @returns void
   *
   * @public
   */
  run(): void

  /**
   * Render stdout
   *
   * @param Component - Component or string to render
   * @param title - Title to render
   * @returns void
   *
   * @public
   */
  render(Component: any, title?: string): void

  /**
   * Rerender
   *
   * @param Component - Component or string to render
   * @param title - Title to render
   * @returns void
   *
   * @public
   */
  rerender(): Promise<void>
}
