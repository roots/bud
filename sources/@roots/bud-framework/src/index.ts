// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ⚡️ `@roots/bud-framework` - Extensible build tooling for modern web development
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

export * from './bud.js'
export * from './service.js'

export type * as Config from './types/config/index.js'
export type * from './types/options/index.js'
export * from './types/services/index.js'
export * from './types/services/hooks/index.js'

export type {Items} from './types/registry/items.js'
export type {Loaders} from './types/registry/loaders.js'
export type {Rules} from './types/registry/rules.js'
export type {Item} from './types/services/build/item.js'
export type {Loader} from './types/services/build/loader.js'
export type {Rule} from './types/services/build/rule.js'
export type * as Registry from './types/registry/index.js'
export type {Modules} from './types/registry/modules.js'
export type {Locations} from './types/registry/locations.js'
