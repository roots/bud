import type {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
} from 'postcss'
import type {Bud, Fluent} from '@roots/bud-typings'

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
  bud: Bud
  methods: Array<[string, PostCss.Config]>
  init: Fluent<PostCss>
  next: (this: PostCss) => Bud
}

/**
 * PostCss configuration utility.
 */
export type Config = Fluent<PostCss>

/**
 * PostCss configuration utility constructor.
 */
export type Factory = (bud: Bud) => PostCss

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
