// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ⚡️ `@roots/bud-framework` - Extensible build tooling for modern web development
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

export type {Api} from '@roots/bud-framework/api'
export * from '@roots/bud-framework/bud'
export type {Item} from '@roots/bud-framework/build/item'
export type {Loader} from '@roots/bud-framework/build/loader'
export type {Rule} from '@roots/bud-framework/build/rule'
export type {Build} from '@roots/bud-framework/build'
export type {Cache} from '@roots/bud-framework/cache'
export type {Compiler} from '@roots/bud-framework/compiler'
export type * as Config from '@roots/bud-framework/config'
export type * as Configuration from '@roots/bud-framework/configuration'
export type {Context} from '@roots/bud-framework/context'
export type {Dashboard} from '@roots/bud-framework/dashboard'
export type {Env} from '@roots/bud-framework/env'
export type {Extensions} from '@roots/bud-framework/extensions'
export type {Hooks} from '@roots/bud-framework/hooks'
export type {Project} from '@roots/bud-framework/project'
export type {Server} from '@roots/bud-framework/server'
export {
  type Contract as BudService,
  default as Service,
  ServiceContainer,
} from '@roots/bud-framework/service'


export type * as Registry from './registry/index.js'
export type {Items} from './registry/items.js'
export type {Loaders} from './registry/loaders.js'
export type {Locations} from './registry/locations.js'
export type {Modules} from './registry/modules.js'
export type {Rules} from './registry/rules.js'
