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
import {Extension} from './extension/index.js'
import {Logger} from './logger/index.js'
import {ContainerService, Service} from './service.js'

export {Bud, ContainerService, Extension, Logger, Service}

import type * as Config from './config/index.js'
import type * as Services from './services/index.js'
import type * as Api from './services/api/index.js'
import type * as Build from './services/build/index.js'
import type * as Cache from './services/cache/index.js'
import type * as Compiler from './services/compiler/index.js'
import type * as Dashboard from './services/dashboard/index.js'
import type * as Env from './services/env/index.js'
import type * as Extensions from './services/extensions/index.js'
import type * as Hooks from './services/hooks/index.js'
import type * as Project from './services/project/index.js'
import type * as Server from './services/server/index.js'

import type {Locations} from './registry/locations.js'
import type {
  Modules,
  Definitions as ModuleDefinitions,
} from './registry/modules.js'
import type {Flags} from './registry/flags.js'
import type {Events} from './registry/events.js'
import type {Patterns} from './registry/patterns.js'
import type {Dev} from './registry/dev.js'
import type {Values} from './registry/values.js'
import type {Store} from './registry/index.js'

export type {
  Api,
  Build,
  Cache,
  Compiler,
  Config,
  Dashboard,
  Dev,
  Env,
  Events,
  Extensions,
  Flags,
  Hooks,
  Locations,
  Modules,
  ModuleDefinitions,
  Patterns,
  Project,
  Server,
  Services,
  Store,
  Values,
}

/**
 * Registered types
 *
 * @public
 */
//

export type Mode = 'production' | 'development'
