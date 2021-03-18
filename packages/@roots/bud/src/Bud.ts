import './interface'

import {Api} from './services/Api'
import {Build} from './services/Build'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Dashboard} from '@roots/bud-dashboard'
import {Dependencies} from './services/Dependencies'
import {Discovery} from './services/Discovery'
import {Disk} from './services/Disk'
import {Env} from './services/Env'
import {Extensions} from './services/Extensions'
import {Hooks} from './services/Hooks'
import {Logger} from './services/Logger'
import {Server} from './services/Server'
import {Store} from './services/Store'
import {Util} from './services/Util'
import {Framework} from '@roots/bud-framework'
import {CLI} from '@roots/bud-typings'

export class Bud extends Framework {
  public api: Api

  public build: Build

  public cache: Cache

  public cli: CLI

  public compiler: Compiler

  public dashboard: Dashboard

  public dependencies: Dependencies

  public discovery: Discovery

  public disk: Disk

  public env: Env

  public extensions: Extensions

  public hooks: Hooks

  public logger: Logger

  public server: Server

  public store: Store

  public util: Util

  public constructor(props) {
    super(props)

    this.topics = this.topics.bind(this)
    this.publish = this.publish.bind(this)
    this.subscribe = this.subscribe.bind(this)
  }

  /**
   * ## mode
   *
   * Return current mode as a string
   */
  public get mode() {
    return process.argv.includes('development') ||
      process.argv.includes('dev')
      ? 'development'
      : 'production'
  }

  /**
   * ## isProduction
   *
   * True if Webpack.Configuration['mode'] is 'production'
   */
  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  /**
   * ## app.isDevelopment
   *
   * True if Webpack.Configuration['mode'] is 'development'
   */
  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  /**
   * Topics
   */
  public topics(topics: string[], caller?: string) {
    topics.map(topic => this.hooks.set(topic, [this.util.noop]))
  }

  /**
   * Subscribe
   */
  public subscribe<T = any>(name: string, caller?: string): T {
    return this.hooks.filter<T>(caller ? [caller, name] : name)
  }

  /**
   * Publish
   */
  public publish<T = any>(
    pubs: {[key: string]: any},
    caller?: string,
  ) {
    Object.entries(pubs).map(([name, pub]: [string, any]) => {
      this.hooks.on(caller ? [caller, name] : name, pub)
    })
  }
}
