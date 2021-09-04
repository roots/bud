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
 * Dashboard Service class
 *
 * @remarks
 * The dashboard is initialized on `booted` if the
 * `cli` key from `bud.store` is set to `true`.
 *
 * @class Dashboard
 * @classdesc Dashboard Service class
 *
 * @extends {Base}
 * @implements {Contract}
 * @export {Dashboard} Dashboard Service class
 */
class Dashboard extends Base implements Contract {
  /**
   * The service name
   *
   * @type {string}
   * @implements {Contract['name']}
   */
  public name: Contract['name'] = 'dashboard'

  /**
   * The ink instance
   *
   * @type {Ink}
   */
  public instance: Ink.Instance

  /**
   * {@link Base.register} lifecycle event handler
   *
   * @returns {void}
   */
  @bind
  public register(): void {
    this.bindMacro({error: Error})
  }

  /**
   * {@link Base.booted} lifecycle event handler
   *
   * @returns {void}
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
   * unless the app.store `cli` entry is `false.
   *
   * By default the `cli` entry is false. However, the
   * cli class from `@roots/bud` sets it to `true`.
   *
   * @returns {void}
   *
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
   * @remarks
   * @see {@link Framework.error}
   *
   * @param {string} message - The error message to render.
   * @param {string} title - The error title to render.
   *
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
   * @param {React.FunctionComponent} Output - The body of the screen
   *
   * @param Output
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

export {Dashboard}
