import {
  Bud,
  Extension,
  Item,
  Loader,
  Rule,
} from '@roots/bud-typings'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

export type Boot = Extension.Module.Boot
export type When = Extension.Module.When
export type RegisterLoader = Extension.Module.RegisterOne<Loader>

export type Make = Extension.Module.Make<
  ReactRefreshPlugin,
  ReactRefreshPluginOptions
>

export type Options = Extension.Module.RawOptions<ReactRefreshPluginOptions>

export type RegisterRule = [
  string,
  {
    test: (bud: Bud) => RegExp
    use: (bud: Bud) => Rule.Module['use']
  },
]

export namespace RegisterRule {
  export type Test = (bud: Bud) => RegExp
  export type Use = (bud: Bud) => Rule.Module['use']
}

export type RegisterItem = Extension.Module.RegisterOne<Item.Module>

export namespace API {
  export type ReactRefresh = (
    this: Bud,
    options: ReactRefreshPluginOptions,
  ) => Bud
}
