import {Service} from '../Service'
import {Instance} from 'ink'

export interface Dashboard extends Service {
  /**
   * Service name
   */
  name: any

  /**
   * Instance
   */
  instance: Instance

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
  renderError(body: string, title: string): Dashboard['instance']

  /**
   * Unmount CLI
   */
  kill(): void
}
