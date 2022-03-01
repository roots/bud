import {Dashboard as Contract, Framework} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, once} from '@roots/bud-support'
import React from 'react'
import {MultiCompiler} from 'webpack'

/**
 * Dashboard service
 *
 * @public
 */
export class Dashboard extends Service implements Contract {
  /**
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async bootstrap(): Promise<void> {
    this.app.hooks.action('event.compiler.after', async app => {
      app.store.is('features.dashboard', true) && (await this.run())
    })
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
  public async run(compiler?: MultiCompiler): Promise<Framework> {
    const {Serve} = await import('../components')
    const {render} = await import('ink')

    render(<Serve app={this.app} />)

    return this.app
  }
}
