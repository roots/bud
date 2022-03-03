import {Dashboard as Contract} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, once} from '@roots/bud-support'
import React from 'react'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Contract {
  /**
   * Boot
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async boot(): Promise<void> {
    this.app.hooks.action('event.server.after', this.run)
  }

  /**
   * Run dashboard
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async run(): Promise<void> {
    const {Serve} = await import('../components')
    const {render} = await import('ink')

    render(<Serve app={this.app} />)
  }
}
