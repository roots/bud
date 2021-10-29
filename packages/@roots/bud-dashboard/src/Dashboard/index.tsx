import {Dashboard as Contract} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import {Box, Instance, render, Text} from 'ink'
import React from 'react'

import {Dashboard as DashboardComponent} from '../components/Dashboard'
import {Screen} from '../components/Screen'
import {Error} from '../Error'
import {isString} from '../services/lodash'

/**
 * Dashboard service container implementation
 *
 * @public @core @container
 */
export class Dashboard extends Service implements Contract {
  /**
   * The {@link Ink} instance
   * @public
   */
  public instance: Instance

  /**
   * Service register callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public bootstrap(): void {
    this.run()
  }

  /**
   * Run the dashboard
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public run(): void {
    if (this.app.store.isTrue('ci')) return

    if (!this.instance) {
      this.instance = render(
        <DashboardComponent bud={this.app} />,
      )
    } else {
      this.instance?.rerender(
        <DashboardComponent bud={this.app} />,
      )
    }
  }

  /**
   * Renders an error message and title to the screen.
   *
   * @see {@link Framework.error}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public renderError(body: string, title?: string): void {
    this.render(
      <Screen app={this.app}>
        <Error body={body} title={title ?? 'Error'} />
      </Screen>,
    )
  }

  /**
   * Renders to the screen. It will rerender the existing
   * component if already initialized.
   *
   * @param Component - The body of the screen
   * @param title - The title of the screen
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public render(Component: any, title?: string): void {
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

    if (!this.instance) {
      this.instance = render(
        <Screen app={this.app} title={title ?? null}>
          <Output />
        </Screen>,
      )
    } else {
      this.instance.rerender(
        <Screen app={this.app} title={title ?? null}>
          <Output />
        </Screen>,
      )
    }
  }
}
