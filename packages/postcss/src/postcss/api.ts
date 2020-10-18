import type {
  AcceptedPlugin,
  Syntax,
  SourceMapOptions,
  Parser,
  Stringifier,
} from 'postcss'

export const postcss: Framework.Fluent<
  Framework.Bud,
  Options
> = function (options) {
  this.features.enable('postcss')

  this.components['items']
    .get('postcss')
    .setOptions({...options})

  return this
}

export interface PluginTuple {
  plugin: AcceptedPlugin
  options?: unknown
}

export interface PluginStore {
  [key: string]: PluginTuple
}

export interface Options {
  syntax?: Syntax
  plugins?: PluginStore[]
  map?: SourceMapOptions
  parser?: Parser
  stringifier?: Stringifier
}
