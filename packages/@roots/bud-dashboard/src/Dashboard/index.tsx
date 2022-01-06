import {
  Dashboard as Contract,
  Framework,
} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, chalk, once} from '@roots/bud-support'
import {Instance, render} from 'ink'
import React from 'react'

import {Dashboard as DashboardComponent} from '../components/dashboard.component'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Contract {
  /**
   * ink instance
   *
   * @public
   */
  public instance: Instance

  /**
   * Stderr buffer
   *
   * @public
   */
  public stderr: string[] = []

  /**
   * Stdout buffer
   *
   * @public
   */
  public stdout: string[] = []

  /**
   * Service register callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async bootstrap(): Promise<void> {
    this.log('log', chalk.green('initializing dashboard'))

    this.app.hooks.on('event.compiler.after', this.run)
  }

  /**
   * Run the dashboard
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public run(): Framework {
    if (this.app.store.is('features.dashboard', true)) {
      this.app.logger.instance.disable()
      this.render(<DashboardComponent application={this.app} />)
    }

    return this.app
  }

  /**
   * Renders to the screen. It will rerender the existing
   * component if already initialized.
   *
   * @param Component - The body of the screen
   * @param title - The title of the screen
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public render(Component: any): void {
    this.instance = render(Component)
  }

  @bind
  public async rerender(): Promise<void> {
    setTimeout(() => {
      this.instance.rerender(
        render(<DashboardComponent application={this.app} />),
      )
    }, 500)
  }
}
