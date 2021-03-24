import {Service} from '@roots/bud-framework'
import React from 'react'
import {render, Instance, Text} from 'ink'
import {isString} from 'lodash'

import {Dashboard} from './Dashboard'
import {Theme} from './api'
import {Error} from './Error'
import {Screen} from './components/Screen'
import {Mark} from './Mark'

/**
 * Dashboard
 */
export class DashboardService extends Service {
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
    return this.app.store.isTrue('options.ci')
  }

  /**
   * Register service
   */
  public register(): void {
    Object.assign(this.app, {
      theme: new Theme(this.app.get()),
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
  public run(): void {
    if (this.app.store.get('options.ci')) {
      return
    }

    this.info('Initializing dashboard..')

    if (this.ci) {
      return
    }

    this.render(<Dashboard bud={this.app} />)
  }

  /**
   * Render error
   */
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
  public kill(): void {
    this.dashboard.unmount()
  }
}
