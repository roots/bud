import {Dashboard as Contract, Framework} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, chalk, once} from '@roots/bud-support'
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
    this.app.hooks.async('event.compiler.after', async app => {
      app.store.is('features.dashboard', true) && (await this.run())
      return app
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
    const {Build} = await import('../components')
    const {render} = await import('ink')

    this.log('info', {
      message: chalk.blue`rendering dashboard`,
    })

    render(<Build tap={() => this.app.root} />)

    return this.app
  }
}
