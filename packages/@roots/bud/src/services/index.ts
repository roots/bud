import type {Framework} from '@roots/bud-framework'

import {Api} from './Api'
import {Build} from './Build'
import {Cache} from './Cache'
import {Compiler} from './Compiler'
import {Dashboard} from './Dashboard'
import {Dependencies} from './Dependencies'
import {Discovery} from './Discovery'
import {Env} from './Env'
import {Extensions} from './Extensions'
import {Hooks} from './Hooks'
import {Logger} from './Logger'
import {Server} from './Server'
import {Store} from './Store'

/**
 * Registered services
 */
export const services: Framework.Services = {
  logger: Logger,
  store: Store,
  api: Api,
  hooks: Hooks,
  env: Env,
  build: Build,
  cache: Cache,
  discovery: Discovery,
  dependencies: Dependencies,
  extensions: Extensions,
  server: Server,
  dashboard: Dashboard,
  compiler: Compiler,
}
