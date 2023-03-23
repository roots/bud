/**
 * @package @roots/bud-cache
 */

import type InvalidateCacheExtension from './invalidate-cache/index.js'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-cache/invalidate-cache': InvalidateCacheExtension
  }
}
