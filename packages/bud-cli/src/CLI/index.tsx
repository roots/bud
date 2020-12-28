import {React, render} from '@roots/bud-support'
import {Dashboard} from '../containers/Dashboard'

import Service from './Service'

export class CLI extends Service {
  public init(): void {
    this.kill = this.kill.bind(this)
  }

  public run(): void {
    this.dashboard = render(
      <Dashboard bud={this.app} mode={this.app.mode.get()} />,
    )
  }

  public kill(): void {
    this.dashboard.unmount()
  }
}
