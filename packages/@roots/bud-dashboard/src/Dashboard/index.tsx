import {Service as Base} from '@roots/bud-framework'
import {Ink, React} from '@roots/bud-support'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'

import {Error} from '../components/Error'
import {Screen} from '../components/Screen'
import {Dashboard as DashboardComponent} from './Dashboard'

const {Box, render, Text} = Ink

/**
 * Service: Dashboard
 */
export class Dashboard extends Base {
  /**
   * @property {string} name
   */
  public name = 'dashboard'

  public instance: Ink.Instance

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
  public renderError(body: string, title: string): Ink.Instance {
    return render(
      <Screen app={this.app}>
        <Error body={body} title={title} />
      </Screen>,
    )
  }

  @bind
  public render(Component: any, title?: string): Ink.Instance {
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
