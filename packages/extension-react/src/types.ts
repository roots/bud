import {
  Bud,
  Extension,
  Item,
  Loader,
  Rule,
} from '@roots/bud-typings'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

/**
 * Make extension
 */
export type Make = Extension.Make<
  ReactRefreshPlugin,
  ReactRefreshPluginOptions
>

/**
 * Extension options
 */
export type Options = Extension.RawOptions<
  ReactRefreshPluginOptions
>

/**
 * Extension conditions
 */
export type When = Extension.When

/**
 * Register Loader
 */
export type RegisterLoader = Extension.RegisterOne<Loader>

/**
 * Register Rule
 */
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

/**
 * Register Item
 */
export type RegisterItem = Extension.RegisterOne<Item.Module>

/**
 * Extension Boot alias
 */
export type Boot = Extension.Boot

/**
 * API
 */
export namespace API {
  export type ReactRefresh = (
    this: Bud,
    options: ReactRefreshPluginOptions,
  ) => Bud
}
