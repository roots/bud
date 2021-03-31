import type {
  Container,
  Framework,
  Module,
} from '@roots/bud-framework'
import type {Plugin} from '@roots/entrypoints-webpack-plugin'

/**
 * @module      `@roots/bud-framework`
 * @description Extended framework definition
 */
declare module '@roots/bud-framework' {
  namespace Framework.Hooks.Extension {
    interface Definitions {
      '@roots/bud-entrypoints': Extension
    }
  }
}

/**
 * @typedef     Options
 * @description Framework extension options
 */
interface Options {
  name: string
  writeToFileEmit: boolean
}

/**
 * @typedef     Extension
 * @description Wrapper for `@roots/entrypoints-webpack-plugin`
 */
interface Extension extends Module {
  name: '@roots/bud-entrypoints'
  make: (options: Container<Options>) => Plugin
  options: (app: Framework) => Options
}

/**
 * @exports
 */
export type {Options, Extension}
