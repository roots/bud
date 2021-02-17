import {React, render} from '@roots/bud-support'
import Service from './Service'
import {Dashboard as Component} from '../containers/Dashboard'

/**
 * Dashboard
 */
export class Dashboard extends Service {
  /**
   * Service ident
   */
  public name = 'cli'

  /**
   * Register service
   */
  public register(): void {
    this.kill = this.kill.bind(this)
    this.run = this.run.bind(this)
  }

  /**
   * Mount CLI
   */
  public run(): void {
    if (this.app.store.get('args.ci')) {
      return
    }

    this.info({
      msg: 'Beginning CLI execution',
    })

    console.clear()

    this.dashboard = render(<Component bud={this.app} />)
  }

  /**
   * Unmount CLI
   */
  public kill(): void {
    this.dashboard.unmount()
  }
}
