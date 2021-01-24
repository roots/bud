import {React, render} from '@roots/bud-support'
import {Framework} from '@roots/bud-typings'

import Service from './Service'
import {Dashboard} from '../containers/Dashboard'

/**
 * CLI
 */
export class CLI extends Service {
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
    if (this.app.store.get('args.ci')) return

    this.info({msg: 'Beginning CLI execution'})

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
