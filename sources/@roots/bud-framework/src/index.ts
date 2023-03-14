// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ⚡️ `@roots/bud-framework` - Extensible build tooling for modern web development
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

/* eslint-disable simple-import-sort/imports */

import {Bud} from './bud.js'
import {Extension} from './extension/index.js'
import {Service, ServiceContainer} from './service.js'

import type * as Config from './types/config/index.js'
import type * as Options from './types/options/index.js'
import type * as Services from './types/services/index.js'
import type Hooks from './types/services/hooks/index.js'
import type {Logger} from './types/services/logger/index.js'

import type {Items} from './types/registry/items.js'
import type {Loaders} from './types/registry/loaders.js'
import type {Rules} from './types/registry/rules.js'
import type {Item} from './types/services/build/item.js'
import type {Loader} from './types/services/build/loader.js'
import type {Rule} from './types/services/build/rule.js'
import type * as Registry from './types/registry/index.js'
import type {Modules} from './types/registry/modules.js'
import type {Locations} from './types/registry/locations.js'

export {Bud, Extension, Service, ServiceContainer}

export type {Config, Options}
export type {Hooks, Logger, Registry, Services}

export type {Item, Loader, Rule}
export type {Items, Loaders, Rules}
export type {Locations}
export type {Modules}
