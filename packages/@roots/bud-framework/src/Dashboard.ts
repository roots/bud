import {Service} from './Service'

/**
 * Dashboard service container
 *
 * @public @core @container
 */
export interface Dashboard extends Service {
  /**
   * CLI framework
   *
   * @public
   */
  instance: unknown

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
   * Render error
   *
   * @param body - body of the error message
   * @param title - title of the error message
   * @returns void
   *
   * @public
   */
  renderError(body: string, title: string): void
}
