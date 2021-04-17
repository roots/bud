import type {
  Container,
  Framework,
  Module,
} from '@roots/bud-framework'
import type {Plugin} from '@roots/entrypoints-webpack-plugin'

/**
 * @module Framework
 * @description Extended framework definition
 */
declare module '@roots/bud-framework' {
  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-entrypoints': Extension
    }
  }
}

/**
 * @interface Options
 * @description Framework extension options
 */
interface Options {
  name: string
  writeToFileEmit: boolean
}

/**
 * @interface Extension
 * @description Wrapper for `@roots/entrypoints-webpack-plugin`
 */
interface Extension extends Module {
  name: Module['name'] | '@roots/bud-entrypoints'
  make: (options: Container<Options>) => Plugin
  options: (app: Framework) => Options
}

/**
 * @exports
 */
export type {Options, Extension}
