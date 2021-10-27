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
  api: Api,
  hooks: Hooks,
  project: Project,
  cache: Cache,
  env: Env,
  build: Build,
  compiler: Compiler,
  dashboard: Dashboard,
  dependencies: Dependencies,
  extensions: Extensions,
  server: Server,
}
