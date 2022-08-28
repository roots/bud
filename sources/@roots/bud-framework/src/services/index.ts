import type {Service} from '../service.js'
import type * as Api from './api/index.js'
import type * as Build from './build/index.js'
import type * as Cache from './cache/index.js'
import type * as Dashboard from './dashboard/index.js'
import type * as Env from './env/index.js'
import type * as Extensions from './extensions/index.js'
import type * as Hooks from './hooks/index.js'
import type * as Project from './project/index.js'
import type * as Server from './server/index.js'

export type {
  Api,
  Build,
  Cache,
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
export interface Registry extends Record<string, Service> {
  api: Api.Service
  build: Build.Service
  cache: Cache.Service
  dashboard: Dashboard.Service
  env: Env.Service
  extensions: Extensions.Service
  hooks: Hooks.Service
  project: Project.Service
  server: Server.Service
}
