import {React, render} from '@roots/bud-support'
import {Dashboard} from '../containers/Dashboard'
import Service from './Service'
import {Framework} from '@roots/bud-typings'

/**
 * CLI
 */
export class CLI extends Service {
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
    if (this.app.store.get('args.ci')) return

    this.dashboard = render(
      <Dashboard bud={this.app as Framework} />,
    )
  }

  /**
   * Unmount CLI
   */
  public kill(): void {
    this.dashboard.unmount()
  }
}
