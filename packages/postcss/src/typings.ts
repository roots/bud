import type {Framework} from '@roots/bud-typings'

import type {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
} from 'postcss'

export type {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
}

declare interface Options {
  syntax?: Syntax
  plugins?: PluginStore[]
  map?: SourceMapOptions
  parser?: Parser
  stringifier?: Stringifier
}

export declare interface PluginTuple {
  plugin: AcceptedPlugin
  options?: unknown
}

export declare interface PluginStore {
  [key: string]: PluginTuple
}

export declare type Adapter = Framework.Extension

export declare type Config = Framework.Api.Fluent<
  Framework.Bud,
  Options
>
