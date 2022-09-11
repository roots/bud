import type * as Service from '../../service.js'
import type * as Api from '../../services/api.js'
import type * as Build from './build'
import type * as Cache from './cache'
import type * as Compiler from './compiler'
import type * as Dashboard from './dashboard'
import type * as Env from './env'
import type * as Extensions from './extensions'
import type * as Hooks from './hooks'
import type * as Project from './project'
import type * as Server from './server'

export type {
  Api,
  Build,
  Cache,
  Compiler,
  Dashboard,
  Env,
  Extensions,
  Hooks,
  Project,
  Server,
}

/**
 * Service registry
 *
 * @virtual @public
 */
export interface Registry extends Record<string, Service.Contract> {
  api: Api.Service
  build: Build.Service
  cache: Cache.Service
  compiler: Compiler.Service
  dashboard: Dashboard.Service
  env: Env.Service
  extensions: Extensions.Service
  hooks: Hooks.Service
  project: Project.Service
  server: Server.Service
}
