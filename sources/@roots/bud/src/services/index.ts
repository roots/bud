import {Api} from './Api'
import {Build} from './Build'
import {Cache} from './Cache'
import {Compiler} from './Compiler'
import {Dashboard} from './Dashboard'
import {Dependencies} from './Dependencies'
import {Env} from './Env'
import {Extensions} from './Extensions'
import {Hooks} from './Hooks'
import {Project} from './Project'
import {Server} from './Server'

/**
 * Bud application services
 *
 * @internal
 */
export const services = {
  api: Api,
  hooks: Hooks,
  project: Project,
  env: Env,
  build: Build,
  compiler: Compiler,
  cache: Cache,
  dependencies: Dependencies,
  server: Server,
  dashboard: Dashboard,
  extensions: Extensions,
}

export {
  Api,
  Build,
  Cache,
  Compiler,
  Dashboard,
  Dependencies,
  Env,
  Extensions,
  Hooks,
  Project,
  Server,
}
