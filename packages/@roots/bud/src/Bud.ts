import './interface'

/**
 * Framework
 */
import {Build} from '@roots/bud-build'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Dashboard} from '@roots/bud-dashboard'
import {Framework} from '@roots/bud-framework'
import {Hooks} from '@roots/bud-hooks'
import {Server} from '@roots/bud-server'

/**
 * Extended
 */
import {Api} from './services/Api'
import {Dependencies} from './services/Dependencies'
import {Discovery} from './services/Discovery'
import {Disk} from './services/Disk'
import {Env} from './services/Env'
import {Extensions} from './services/Extensions'
import {Logger} from './services/Logger'
import {Store} from './services/Store'
import {Util} from './services/Util'

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

  public hooks: Hooks

  public logger: Logger

  public server: Server

  public store: Store

  public util: Util

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
}
