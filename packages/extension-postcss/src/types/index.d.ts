import type {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
} from 'postcss'

import type {Extension, Fluent} from '@roots/bud-typings'

export {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
}

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

export type Boot = Extension.Boot
export type Item = Extension.Contract['registerItem']
export type Loader = Extension.Contract['registerLoader']
