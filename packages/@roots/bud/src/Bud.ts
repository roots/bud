import './interface'

import {Api} from '@roots/bud-api'
import {Build} from '@roots/bud-build'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Dashboard} from '@roots/bud-dashboard'
import {
  Framework,
  Service,
  Bootstrapper,
} from '@roots/bud-framework'

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

/**
 * Bud
 */
export class Bud extends Framework {
  public api: Api

  public build: Build

  public cache: Cache

  public compiler: Compiler

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
}

/**
 * Service providers
 */
export const services: {
  [key: string]: new (app: Framework['get']) =>
    | Service
    | Bootstrapper
} = {
  util: Util,
  api: Api,
  logger: Logger,
  store: Store,
  hooks: Hooks,
  env: Env,
  build: Build,
  discovery: Discovery,
  dependencies: Dependencies,
  disk: Disk,
  extensions: Extensions,
  cache: Cache,
  server: Server,
  dashboard: Dashboard,
  compiler: Compiler,
}
