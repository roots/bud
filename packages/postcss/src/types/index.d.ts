import '@roots/bud-typings'

import type {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
} from 'postcss'

export namespace BudPostCss {
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
}
