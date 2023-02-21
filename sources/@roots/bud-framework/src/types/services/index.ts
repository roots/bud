import type * as Service from '../../service.js'
import type FS from '../../services/fs.js'
import type {Notifier} from '../../services/notifier/notifier.js'
import type {Api} from './api/index.js'
import type * as Build from './build/index.js'
import type * as Cache from './cache/index.js'
import type * as Compiler from './compiler/index.js'
import type * as Dashboard from './dashboard/index.js'
import type {Env} from './env/index.js'
import type * as Extensions from './extensions/index.js'
import type Hooks from './hooks/index.js'
import type * as Project from './project/index.js'
import type * as Server from './server/index.js'

/**
 * Service registry
 *
 * @virtual @public
 */
export interface Registry extends Record<string, any> {
  api: Api
  build: Build.Service
  cache: Cache.Service
  compiler: Compiler.Service
  dashboard: Dashboard.Service
  env: Env
  extensions: Extensions.Service
  fs: FS & Service.Contract
  hooks: Hooks
  notifier: Notifier
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
  Notifier,
  Project,
  Server,
  FS,
}
