import Api from '@roots/bud-api'
import Build from '@roots/bud-build'
import Cache from '@roots/bud-cache'
import Compiler from '@roots/bud-compiler'
import Dashboard from '@roots/bud-dashboard'
import Extensions from '@roots/bud-extensions'
import Server from '@roots/bud-server'

import {Env} from './env/index.js'
import {Hooks} from './hooks/index.js'
import {Project} from './project/index.js'

/**
 * Bud application services
 *
 * @internal
 */
export const services = {
  api: Api,
  build: Build,
  cache: Cache,
  compiler: Compiler,
  dashboard: Dashboard,
  env: Env,
  extensions: Extensions,
  hooks: Hooks,
  project: Project,
  server: Server,
}

export {
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
