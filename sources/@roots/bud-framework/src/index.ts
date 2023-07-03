// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ⚡️ `@roots/bud-framework` - Extensible build tooling for modern web development
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

export * from './bud.js'
export {
  type Contract as BudService,
  default as Service,
  ServiceContainer,
} from './service.js'
export type {Context} from '@roots/bud-framework/context'
export type * from '@roots/bud-framework/config'
export type * as Registry from './registry/index.js'

export type {Items} from './registry/items.js'
export type {Loaders} from './registry/loaders.js'
export type {Locations} from './registry/locations.js'
export type {Modules} from './registry/modules.js'
export type {Rules} from './registry/rules.js'
export type {Item} from './services/build/item.js'
export type {Loader} from './services/build/loader.js'
export type {Rule} from './services/build/rule.js'
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
} from '@roots/bud-framework/services'
