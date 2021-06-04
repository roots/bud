import {Service as Base} from '@roots/bud-framework'
import React from 'react'
import {render, Text, Instance} from 'ink'
import {isString} from 'lodash'

import {boundMethod as bind} from 'autobind-decorator'

import {Dashboard as DashboardComponent} from './Dashboard'
import {Error} from '../components/Error'
import {Write} from '../components/Write'
import {Screen} from '../components/Screen'
import {Mark} from '../components/Mark'

export class Dashboard extends Base {
  public name = 'dashboard'

  public instance: Instance

  public _data: string[] = []

  public get data(): string[] {
    return this._data
  }

  public set data(data: string[]) {
    this._data = [...this._data, ...data]
  }

  @bind
  public register(): void {
    Object.assign(this.app, {
      write: Write,
      error: Error,
    })
  }

  @bind
  public run(): void {
    if (this.app.store.isTrue('ci')) {
      console.log('ci mode')
      return
    }

    this.instance = render(
      <Screen>
        <Mark text={this.app.name} />
        <DashboardComponent bud={this.app} />
      </Screen>,
    )
  }

  @bind
  public renderError(body: string, title: string): Instance {
    return render(
      <Screen>
        <Mark text={this.app.name} />
        <Error body={body} title={title} />
      </Screen>,
    )
  }

  @bind
  public render(Component: any): Instance {
    const Output = () =>
      isString(Component) ? (
        <Text>{Component}</Text>
      ) : Array.isArray(Component) ? (
        Component.map((c, id) => <Text key={id}>{c}</Text>)
      ) : (
        Component
      )

    return render(
      <Screen>
        <Mark text={this.app.name} />
        <Output />
      </Screen>,
    )
  }

  @bind
  public kill(): void {
    this.dashboard && this.dashboard.unmount()
  }
}
