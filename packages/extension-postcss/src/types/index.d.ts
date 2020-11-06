import '@roots/bud-typings'

import type {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
} from 'postcss'

export as namespace PostCss

export {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
}

/**
 * PostCss
 */
export interface PostCss {
  bud: Framework.Bud
  methods: Array<[string, PostCss.Config]>
  init: Framework.Fluent<PostCss>
  next: (this: PostCss) => Framework.Bud
}

/**
 * PostCss configuration utility.
 */
export type Config = Framework.Fluent<PostCss>

/**
 * PostCss configuration utility constructor.
 */
export type Factory = (bud: Framework.Bud) => PostCss

export interface Options {
  syntax?: Syntax
  plugins?: PluginStore[]
  map?: SourceMapOptions
  parser?: Parser
  stringifier?: Stringifier
}

export interface PluginTuple {
  plugin: AcceptedPlugin
  options?: unknown
}

export interface PluginStore {
  [key: string]: PluginTuple
}

export type Adapter = Framework.Extension
