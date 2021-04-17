import {Module} from '@roots/bud-framework'

/**
 * @module Framework
 * @description Extended framework definition
 */
declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-entrypoints': Module
    }
  }
}
