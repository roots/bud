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
import {Framework} from '@roots/bud-framework'
import {Logger} from './services/Logger'
import {Server} from '@roots/bud-server'
import {Store} from './services/Store'
import {Util} from './services/Util'
import {Framework as Contract} from '@roots/bud-typings'

export class Bud extends Framework {
  public api: Api

  public build: Build

  public cache: Cache

  public compiler: Compiler

  public dashboard: Dashboard

  public dependencies: Dependencies

  public discovery: Discovery

  public disk: Disk

  public env: Env

  public extensions: Extensions

  public hooks: Contract.Hooks

  public logger: Logger

  public server: Server

  public store: Store

  public util: Util

  public constructor(props) {
    super(props)

    this.publish = this.publish.bind(this)
    this.subscribe = this.subscribe.bind(this)
  }

  public get mode() {
    return process.argv.includes('development') ||
      process.argv.includes('dev')
      ? 'development'
      : 'production'
  }

  public get isProduction(): boolean {
    return this.mode === 'production'
  }

  public get isDevelopment(): boolean {
    return this.mode === 'development'
  }

  public subscribe<T = any>(
    name: `${Contract.Hooks.Name}`,
    caller?: string,
  ): T {
    return this.hooks.filter<T>(caller ? [caller, name] : name)
  }

  public publish(
    pubs: Contract.Hooks.PublishDict,
    caller?: string,
  ): Framework {
    Object.entries(pubs).map(
      ([name, pub]: [`${Contract.Hooks.Name}`, any]) => {
        this.hooks.on(caller ? [caller, name] : name, pub)
      },
    )

    return this
  }
}
