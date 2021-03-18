import {Bootstrapper} from '@roots/bud-typings'

import {Api} from './Api'
import {Build} from './Build'
import {Dependencies} from './Dependencies'
import {Discovery} from './Discovery'
import {Disk} from './Disk'
import {Env} from './Env'
import {Extensions} from './Extensions'
import {Hooks} from './Hooks'
import {Logger} from './Logger'
import {Server} from './Server'
import {Store} from './Store'
import {Util} from './Util'

import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Dashboard} from '@roots/bud-dashboard'
import {Framework, Service} from '@roots/bud-framework'

/**
 * Service providers
 */
export const services: {
  [key: string]: new (app: Framework['get']) =>
    | Service
    | Bootstrapper
} = {
  api: Api,
  logger: Logger,
  hooks: Hooks,
  store: Store,
  env: Env,
  util: Util,
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
