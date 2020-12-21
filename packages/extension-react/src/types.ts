import {
  Framework,
  Module,
  Item,
  Loader,
  Rule,
} from '@roots/bud-typings'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

export type Boot = Module.Boot
export type When = Module.When
export type RegisterLoader = Module.RegisterOne<Loader>

export type Make = Module.Make<
  ReactRefreshPlugin,
  ReactRefreshPluginOptions
>

export type Options = Module.RawOptions<
  ReactRefreshPluginOptions
>

export type RegisterRule = [
  string,
  {
    test: (bud: Framework) => RegExp
    use: (bud: Framework) => Rule.Module['use']
  },
]

export namespace RegisterRule {
  export type Test = (bud: Framework) => RegExp
  export type Use = (bud: Framework) => Rule.Module['use']
}

export type RegisterItem = Module.RegisterOne<Item.Module>

export namespace API {
  export type ReactRefresh = (
    this: Framework,
    options: ReactRefreshPluginOptions,
  ) => Framework
}
