import {Service as Base} from '@roots/bud-framework'
import React from 'react'
import {render, Text, Instance} from 'ink'
import {isString} from 'lodash'

import {boundMethod as bind} from 'autobind-decorator'

import {Dashboard as DashboardComponent} from './Dashboard'
import {Error} from '../Error/index'
import {Write} from '../Write/index'
import {Screen} from '../components/Screen'
import {Mark} from '../Mark/index'

export class Dashboard extends Base {
  public name = 'dashboard'

  public dashboard: Instance

  @bind
  public register(): void {
    Object.assign(this.app, {
      write: Write,
      error: Error,
    })
  }

  @bind
  public run(): void {
    this.info('Initializing dashboard')

    if (this.app.store.isTrue('ci')) {
      return
    }

    this.render(<DashboardComponent bud={this.app} />)
  }

  @bind
  public renderError(body: string, title: string): Instance {
    return (this.dashboard = render(
      <Screen>
        <Mark text={this.app.name} />
        <Error body={body} title={title} />
      </Screen>,
    ))
  }

  @bind
  public render(Component: any): Instance {
    if (this.app.store.isTrue('ci')) return

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

  @bind
  public kill(): void {
    this.dashboard && this.dashboard.unmount()
  }
}
