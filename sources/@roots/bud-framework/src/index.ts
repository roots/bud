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

import {Bud} from './bud.js'
import * as Config from './config/index.js'
import {Logger} from './logger/index.js'
import {ContainerService, Service} from './service.js'
import * as Services from './services/index.js'
import * as Api from './services/api/index.js'
import * as Build from './services/build/index.js'
import * as Cache from './services/cache/index.js'
import * as Compiler from './services/compiler/index.js'
import * as Dashboard from './services/dashboard/index.js'
import * as Env from './services/env/index.js'
import * as Extensions from './services/extensions/index.js'
import * as Hooks from './services/hooks/index.js'
import * as Peers from './services/peers/index.js'
import * as Project from './services/project/index.js'
import * as Server from './services/server/index.js'

export * from './extension/index.js'
import {Registry} from './registry/index.js'

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
export {Locations} from './registry/locations.js'
export {
  Modules,
  Definitions as ModuleDefinitions,
} from './registry/modules.js'
export {Flags} from './registry/flags.js'
export {Events} from './registry/events.js'
export {Patterns} from './registry/patterns.js'
export {Dev} from './registry/dev.js'
export {Values} from './registry/values.js'
export {Store} from './registry/index.js'
