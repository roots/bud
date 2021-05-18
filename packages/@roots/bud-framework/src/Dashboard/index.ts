import {Service} from '../Service'

export interface Dashboard extends Service {
  /**
   * Service name
   */
  name: any

  /**
   * Instance
   */
  dashboard: any

  /**
   * Register service
   */
  register(): void

  /**
   * Mount CLI
   */
  run(): void

  /**
   * Render
   */
  render: any

  /**
   * Render error
   */
  renderError(
    body: string,
    title: string,
  ): Dashboard['dashboard']

  /**
   * Unmount CLI
   */
  kill(): void
}
