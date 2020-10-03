import {
  AcceptedPlugin,
  SourceMapOptions,
  Syntax,
  Parser,
  Stringifier,
} from 'postcss'

/**
 * Bud ships with autoprefixer.
 */
import autoprefixer from 'autoprefixer'
const DEFAULT_PLUGINS: PostCssPluginStoreValue = {
  autoprefixer: [autoprefixer, {}],
}
export const postcss: PostCssOptionsInterface = {
  plugins: DEFAULT_PLUGINS,
  sourceMapOptions: null,
  syntax: null,
  parser: null,
  stringifier: null,
  get all(): PostcssOptions {
    return {
      plugins: Object.entries(this.plugins).reduce(
        (acc, [, tuple]) => [...acc, tuple],
        [],
      ),
      sourceMapOptions: this.sourceMapOptions,
      syntax: this.syntax,
      parser: this.parser,
      stringifier: this.stringifier,
    }
  },
}

/**
 * Typings for options to expose to API (keyed)
 */
export declare interface PostCssOptionsInterface
  extends PostCssOptionStoreBase {
  readonly all: PostcssOptions
  plugins: PluginStore
}

/**
 * Common between the store and postcss-loader types
 */
export declare interface PostCssOptionStoreBase {
  sourceMapOptions: SourceMapOptions
  syntax: Syntax
  parser: Parser
  stringifier: Stringifier
}

/**
 * Typings for options to pass to loader (arrayed tuples)
 */
export declare interface PostcssOptions
  extends PostCssOptionStoreBase {
  plugins: PluginTuple[]
}

/**
 * PostCSS loader plugin type
 */
export declare type PluginTuple = [AcceptedPlugin, unknown]

/**
 * The store plugin type
 */
export declare type PostCssPluginStoreValue = {
  [key: string]: PluginTuple
}

/**
 * Can be one or more.
 */
export declare type PluginStore =
  | PostCssPluginStoreValue
  | PostCssPluginStoreValue[]
