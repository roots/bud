import {
  Dashboard as Contract,
  Framework,
} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {
  bind,
  chalk,
  lodash,
  once,
  patchConsole,
} from '@roots/bud-support'
import {Instance, render} from 'ink'
import React from 'react'

import {Dashboard as DashboardComponent} from '../components/dashboard.component'

const {isUndefined} = lodash

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

    this.run()
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
      /** Patch console enables intercepting stdout/stderr */
      const restore = patchConsole((stream, data) => {
        if (!data || data == '\n' || isUndefined(data)) return

        data = data.replaceAll(/\n/g, '')

        if (stream === 'stderr') {
          this.stderr = [...(this.stderr ?? []), data]
        } else {
          this.stdout = [...(this.stdout ?? []), data]
        }
      })

      this.app.hooks.on('event.app.close', restore)

      this.render(<DashboardComponent application={this.app} />)

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
    this.log('await', {message: 'exiting cli'})
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
    this.instance = render(Component, {
      patchConsole: false,
      stream: this.app.logger.stream,
    })
  }
}
