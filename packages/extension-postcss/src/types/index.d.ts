import type {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
} from 'postcss'

import type {
  Extension,
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

export type Boot = Extension.Module.Boot
export type RegisterItem = Extension.Module.RegisterOne<Item.Module>
export type RegisterLoader = Extension.Module.RegisterOne<Loader>

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
