import {Framework, Service} from '@roots/bud-framework'
import {
  React,
  render,
  Instance,
  Text,
  isString,
} from '@roots/bud-support'
import {Styles} from '@roots/ink-use-style'

import {Dashboard as DashboardComponent} from './components'
import {Error} from '../Error'
import {Write} from '../Write'
import {Screen} from '../components/Screen'
import {Mark} from '../Mark'

export {Dashboard}

/**
 * Dashboard
 */
class Dashboard extends Service {
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
  public run(): void {
    if (this.app.store.get('options.ci')) {
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

namespace Dashboard {
  export interface Props {
    bud: Framework
  }

  declare interface WebpackMessage {
    moduleIdentifier: string
    moduleName: string
    message: string
  }

  export interface AppProps {
    bud: Framework
    pkg: {[key: string]: any}
    screens?: Array<[number, number]>
    theme: Styles
    stats: Framework.Compiler.Stats.Output['json']
    progress: {
      percentage: string
      decimal: number
      message: string
    }
    errors: Array<WebpackMessage>
    hasErrors: boolean
    warnings: Array<WebpackMessage>
    hasWarnings: boolean
  }

  export interface Asset {
    chunks: Array<number | string>
    chunkNames: string[]
    emitted: boolean
    isOverSizeLimit?: boolean
    name: string
    size: number
    theme: AppProps['theme']
  }

  export interface UseProgress {
    (): [UseProgress.State, UseProgress.Handler]
  }

  export namespace UseProgress {
    export type State = {
      percentage: Percentage
      msg: string
    }

    export type Handler = (
      percentage: number,
      msg: string,
    ) => void

    export interface Percentage {
      display: string
      decimal: number
    }
  }

  export interface DevServerStatus {
    enabled: boolean
    host: string
    port: number
    status: number
    label: string
    colors: Styles['colors']
  }

  export type FetchStatus = (
    enabled: boolean,
    host: string,
    port: number,
    update: CallableFunction,
  ) => Promise<void>
}
