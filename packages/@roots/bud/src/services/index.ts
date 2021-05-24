import {
  Framework,
  Service,
  Bootstrapper,
} from '@roots/bud-framework'
import {Api} from '@roots/bud-api'
import {Build} from '@roots/bud-build'
import {Cache} from '@roots/bud-cache'
import {Compiler} from '@roots/bud-compiler'
import {Dashboard} from '@roots/bud-dashboard'
import {Dependencies} from './Dependencies/index'
import {Discovery} from './Discovery/index'
import {Disk} from './Disk/index'
import {Env} from './Env/index'
import {Extensions} from './Extensions/index'
import {Hooks} from './Hooks/index'
import {Logger} from './Logger/index'
import {Server} from './Server/index'

interface Services {
  [key: string]: new (app: Framework['get']) =>
    | Service
    | Bootstrapper
}

export const services: Services = {
  api: Api,
  logger: Logger,
  hooks: Hooks,
  env: Env,
  disk: Disk,
  build: Build,
  cache: Cache,
  discovery: Discovery,
  dependencies: Dependencies,
  extensions: Extensions,
  server: Server,
  dashboard: Dashboard,
  compiler: Compiler,
}
