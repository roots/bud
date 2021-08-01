import {Service as Base} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {Box, Instance, render, Text} from 'ink'
import {isString} from 'lodash'
import * as React from 'react'

import {Error} from '../components/Error'
import {Screen} from '../components/Screen'
import {Dashboard as DashboardComponent} from './Dashboard'

export class Dashboard extends Base {
  public name = 'dashboard'

  public instance: Instance

  @bind
  public register(): void {
    Object.assign(this.app, {
      error: Error,
    })
  }

  @bind
  public run(): void {
    if (this.app.store.isTrue('ci')) return

    this.instance = render(
      <Screen app={this.app}>
        <DashboardComponent bud={this.app} />
      </Screen>,
    )
  }

  @bind
  public renderError(body: string, title: string): Instance {
    return render(
      <Screen app={this.app}>
        <Error body={body} title={title} />
      </Screen>,
    )
  }

  @bind
  public render(Component: any, title?: string): Instance {
    const Output = () =>
      isString(Component) ? (
        <Text>{Component}</Text>
      ) : Array.isArray(Component) ? (
        <Box flexDirection="column">
          {Component.map((c, id) => (
            <Text key={id}>{c}</Text>
          ))}
        </Box>
      ) : (
        Component
      )

    return render(
      <Screen app={this.app} title={title ?? null}>
        <Output />
      </Screen>,
    )
  }
}
