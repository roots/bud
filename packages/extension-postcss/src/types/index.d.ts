import type {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
} from 'postcss'

import type {
  Module,
  Item,
  Loader,
  Fluent,
} from '@roots/bud-typings'

export {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
}

export type Boot = Module.Boot
export type setItem = Module.Register<Item>
export type setLoader = Module.Register<Loader>

export type {Fluent}

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
