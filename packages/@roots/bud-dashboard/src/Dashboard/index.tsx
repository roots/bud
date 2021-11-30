import {
  Dashboard as Contract,
  Framework,
} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, once} from '@roots/bud-support'
import {Instance, render} from 'ink'
import React from 'react'

import {Dashboard as DashboardComponent} from '../components/Dashboard'

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
    this.app.hooks.on<'event.compiler.before'>(
      'event.compiler.before',
      config => {
        this.run()
        return config
      },
    )
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
    this.app.hooks.on<'event.dashboard.done'>(
      'event.dashboard.done',
      this.close,
    )

    if (this.app.store.is('features.dashboard', true)) {
      this.render(<DashboardComponent bud={this.app} />)

      this.log('success', {
        message: 'rendering dashboard',
      })
    }

    return this.app
  }

  /**
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public close(): void {
    this.log('success', {message: 'shutting down dashboard'})
    this.instance?.unmount()
    this.app.close()
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
}
