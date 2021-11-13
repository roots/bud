import {
  Dashboard as Contract,
  Framework,
} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {Instance, render} from 'ink'
import React from 'react'

import {Dashboard as DashboardComponent} from '../components/Dashboard'
import {Screen} from '../components/Screen'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Contract {
  /**
   * The Ink instance
   *
   * @public
   */
  public instance: Instance

  /**
   * Service register callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async registered(): Promise<void> {
    this.run()
  }

  /**
   * Run the dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public run(): Framework {
    if (this.app.store.is('features.dashboard', true)) {
      this.instance = render(
        <DashboardComponent bud={this.app} />,
      )

      this.log('success', {message: 'rendering'})
    }

    if (this.app.store.is('cli.flags.log.interactive', true)) {
      this.instance.clear()
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
  public render(Component: any, title?: string): void {
    this.instance = render(
      <Screen app={this.app} title={title ?? null}>
        <Component />
      </Screen>,
    )
  }
}
