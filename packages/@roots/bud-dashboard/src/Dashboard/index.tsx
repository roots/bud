import {
  Dashboard as Contract,
  Service as Base,
} from '@roots/bud-framework'
import {Ink, React} from '@roots/bud-support'
import {boundMethod as bind} from 'autobind-decorator'
import {isString} from 'lodash'

import {Dashboard as DashboardComponent} from '../components/Dashboard'
import {Screen} from '../components/Screen'
import {Error} from '../Error'

/**
 * Dashboard service container implementation
 *
 * @public @core @container
 */
export class Dashboard extends Base implements Contract {
  /**
   * {@inheritDoc @roots/bud-framework#Service.name}
   * @public
   */
  public name = 'dashboard'

  /**
   * The {@link Ink} instance
   * @public
   */
  public instance: Ink.Instance

  /**
   * {@inheritDoc @roots/bud-framework#Service.register}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public register(): void {
    this.bindMacro({error: Error})
  }

  /**
   * {@inheritDoc @roots/bud-framework#Service.booted}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public booted(): void {
    this.run()
  }

  /**
   * Run the dashboard
   *
   * @remarks
   * This method will initialize the dashboard CLI interface
   * unless the app.store `cli` entry is `false`.
   *
   * By default the `cli` entry is false. However, the
   * cli class from `@roots/bud` sets it to `true`.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public run(): void {
    if (this.app.store.isFalse('cli')) return

    if (!this.instance) {
      this.instance = Ink.render(
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
        <Ink.Text>{Component}</Ink.Text>
      ) : Array.isArray(Component) ? (
        <Ink.Box flexDirection="column">
          {Component.map((c, id) => (
            <Ink.Text key={id}>{c}</Ink.Text>
          ))}
        </Ink.Box>
      ) : (
        Component
      )

    if (!this.instance) {
      this.instance = Ink.render(
        <Screen app={this.app} title={title ?? null}>
          <Output />
        </Screen>,
      )
    } else {
      this.instance?.rerender(
        <Screen app={this.app} title={title ?? null}>
          <Output />
        </Screen>,
      )
    }
  }
}
