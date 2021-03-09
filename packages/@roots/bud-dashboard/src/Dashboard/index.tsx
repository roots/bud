import {React, render, Instance, Text} from '@roots/bud-support'
import {Service} from '@roots/bud-framework'
import {Reporter} from './Reporter'
import {Theme} from './api'
import {Error} from './../Error'
import {Screen} from './../components/Screen'
import {Mark} from './../Mark'

/**
 * Dashboard
 */
export default class extends Service {
  /**
   * Service ident
   */
  public name = 'dashboard'

  /**
   * Ink CLI instance
   */
  public dashboard: Instance

  /**
   * Register service
   */
  public register(): void {
    Object.assign(this.app, {
      theme: new Theme(this.app.get()),
      error: Error,
    })

    this.kill = this.kill.bind(this)
    this.run = this.run.bind(this)

    if (this.app.store.enabled('args.ci')) {
      this.app.name = 'Loading'
      this.render(<Text></Text>)
    }
  }

  /**
   * Mount CLI
   */
  public run(): void {
    if (this.app.store.get('args.ci')) {
      return
    }

    this.info({
      msg: 'Beginning CLI execution',
    })

    this.render(<Reporter bud={this.app.get()} />)
  }

  /**
   * Unmount CLI
   */
  public kill(): void {
    this.dashboard.unmount()
  }

  /**
   * Redner
   */
  public render(Component: any): Instance {
    const Output = () =>
      typeof Component == 'string' ? (
        <Text>{Component}</Text>
      ) : Array.isArray(Component) ? (
        Component.map((c, id) => <Text key={id}>{c}</Text>)
      ) : (
        Component
      )

    return (this.dashboard = render(
      <Screen justifyContent="space-between">
        <Mark text={this.app.get().name} />
        <Output />
      </Screen>,
    ))
  }
}
