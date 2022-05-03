/* eslint-disable simple-import-sort/imports */
// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ⚡️ `@roots/bud-framework` - Extensible build tooling for modern web development
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Bud} from './bud'
import * as Config from './config'
import {Logger} from './logger'
import {ContainerService, Service} from './service'
import * as Services from './services'
import * as Api from './services/api'
import * as Build from './services/build'
import * as Cache from './services/cache'
import * as Compiler from './services/compiler'
import * as Dashboard from './services/dashboard'
import * as Env from './services/env'
import * as Extensions from './services/extensions'
import * as Hooks from './services/hooks'
import * as Peers from './services/peers'
import * as Project from './services/project'
import * as Server from './services/server'

export * from './extension'
import {Registry} from './registry'

export {Bud, ContainerService, Service}

export {
  Api,
  Build,
  Cache,
  Compiler,
  Config,
  Dashboard,
  Env,
  Extensions,
  Hooks,
  Logger,
  Peers,
  Project,
  Registry,
  Server,
  Services,
}

/**
 * Registered types
 *
 * @public
 */
//

export type Mode = 'production' | 'development'
export {Locations} from './registry/locations'
export {
  Modules,
  Definitions as ModuleDefinitions,
} from './registry/modules'
export {Flags} from './registry/flags'
export {Events} from './registry/events'
export {Patterns} from './registry/patterns'
export {Dev} from './registry/dev'
export {Values} from './registry/values'
export {Store} from './registry'
