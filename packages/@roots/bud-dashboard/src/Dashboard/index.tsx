import './interface'
import {React, render} from '@roots/bud-support'
import Service from './Service'
import {Reporter} from './Reporter'
import {Theme} from './api'
import {Error} from './../Error'

/**
 * Dashboard
 */
export class Dashboard extends Service {
  /**
   * Service ident
   */
  public name = 'dashboard'

  /**
   * Register service
   */
  public register(): void {
    Object.assign(this.app, {
      theme: new Theme(this.app.get()),
      error: Error,
    })

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

    this.dashboard = render(<Reporter bud={this.app.get()} />)
  }

  /**
   * Unmount CLI
   */
  public kill(): void {
    this.dashboard.unmount()
  }
}
