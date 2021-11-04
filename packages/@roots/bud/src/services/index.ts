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
 * @public
 */
export const services = {
  cache: Cache,
  api: Api,
  hooks: Hooks,
  project: Project,
  env: Env,
  build: Build,
  compiler: Compiler,
  dependencies: Dependencies,
  extensions: Extensions,
  server: Server,
  dashboard: Dashboard,
}
