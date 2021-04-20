import {Service as Base} from '@roots/bud-framework'
import React from 'react'
import {render, Text, Instance} from 'ink'
import {isString} from 'lodash'
import {Dashboard as DashboardComponent} from './components'
import {Error} from '../Error'
import {Write} from '../Write'
import {Screen} from '../components/Screen'
import {Mark} from '../Mark'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * Dashboard
 */
export class Dashboard extends Base {
  /**
   * Service ident
   */
  public name = 'dashboard'

  /**
   * Ink CLI instance
   */
  public dashboard: Instance

  /**
   * CI mode getter
   */
  public get ci() {
    return this.app.store.isTrue('ci')
  }

  /**
   * Register service
   */
  @bind
  public register(): void {
    Object.assign(this.app, {
      write: Write,
      error: Error,
    })

    this.run = this.run.bind(this)
    this.kill = this.kill.bind(this)
    this.render = this.render.bind(this)
    this.renderError = this.renderError.bind(this)
  }

  /**
   * Mount CLI
   */
  @bind
  public run(): void {
    if (this.app.store.get('ci')) {
      return
    }

    this.info('Initializing dashboard')

    if (this.ci) {
      return
    }

    this.render(<DashboardComponent bud={this.app} />)
  }

  /**
   * Render error
   */
  @bind
  public renderError(body: string, title: string): Instance {
    return (this.dashboard = render(
      <Screen>
        <Mark text={this.app.name} />
        <Error body={body} title={title} />
      </Screen>,
    ))
  }

  /**
   * Render
   */
  @bind
  public render(Component: any): Instance {
    if (this.ci) return

    const Output = () =>
      isString(Component) ? (
        <Text>{Component}</Text>
      ) : Array.isArray(Component) ? (
        Component.map((c, id) => <Text key={id}>{c}</Text>)
      ) : (
        Component
      )

    return (this.dashboard = render(
      <Screen>
        <Mark text={this.app.name} />
        <Output />
      </Screen>,
    ))
  }

  /**
   * Unmount CLI
   */
  @bind
  public kill(): void {
    this.dashboard.unmount()
  }
}
