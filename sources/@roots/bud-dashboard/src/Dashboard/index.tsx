import {Dashboard as Contract, Framework} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, chalk, once} from '@roots/bud-support'
import {render} from 'ink'
import React from 'react'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Contract {
  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async bootstrap(): Promise<void> {
    this.log('log', chalk.green('initializing dashboard'))

    if (this.app.store.is('features.dashboard', true)) {
      await this.run()
    }
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
  public async run(): Promise<Framework> {
    const {Dashboard} = await import('../components')

    this.app.hooks.async('event.compiler.after', async app => {
      this.log('success', {message: 'rendering dashboard'})
      process.stdout.write('\n')
      render(<Dashboard tap={() => this.app.root} />)

      return app
    })

    return this.app
  }
}
