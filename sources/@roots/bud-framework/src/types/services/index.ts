import type * as Service from '../../service.js'
import type * as Api from '../../services/api.js'
import type FS from '../../services/fs.js'
import type * as Build from './build/index.js'
import type * as Cache from './cache/index.js'
import type * as Compiler from './compiler/index.js'
import type * as Dashboard from './dashboard/index.js'
import type * as Env from './env/index.js'
import type * as Extensions from './extensions/index.js'
import type Hooks from './hooks/index.js'
import type * as Project from './project/index.js'
import type * as Server from './server/index.js'

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
  fs: FS & Service.Contract
  hooks: Hooks
  project: Project.Service
  server: Server.Service
}

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
  FS,
}
