// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Compiler and pre-compiler caching
 *
 * @see {@link https://bud.js.org}
 * @see {@link https://github.com/roots/bud}
 *
 * @packageDocumentation
 */

import type InvalidateCacheExtension from './invalidate-cache-extension/index.js'
import Cache from './service.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-cache/invalidate-cache': InvalidateCacheExtension
  }
}

export {Cache, Cache as Service, Cache as default}
