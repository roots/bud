import {
  React,
  render,
  Instance,
  Service,
} from '@roots/bud-support'
import Compile from '../containers/Compile'
import {Serve} from '../containers/Serve'
import type {Framework} from '@roots/bud-typings'

/**
 * ## bud.cli
 *
 * Ink application controller.
 */
export class Runner extends Service<Framework> {
  /**
   * Ink instance
   */
  public instance: Instance

  /**
   * Initialize service.
   */
  public init(): void {
    this.run = this.run.bind(this)
    this.kill = this.kill.bind(this)
  }

  /**
   * Run the dashboard.
   */
  public run(): void {
    this.instance = this.app.mode.is('development')
      ? render(<Serve bud={this.app} />)
      : render(<Compile bud={this.app} />)
  }

  /**
   * Kill CLI instance
   */
  public kill(): void {
    this.instance.unmount()
  }
}
