import {Framework} from './'

/**
 * Item
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Item extends Framework.Service<Framework> {
  ident?: Item.Module.Ident

  loader?: Item.Module.Loader

  options?: Item.Module.Options

  query?: Item.Module.Query

  make: () => Item.RuleSetLoader
}

export namespace Item {
  export type RuleSetLoader = {
    ident?: Module.Ident

    loader?: Module.Loader

    options?: Module.Options

    query?: Module.Query
  }

  export type Module = {
    ident?: Module.Ident

    loader?: Module.Loader

    options?: Module.Options

    query?: Module.Query
  }

  export namespace Module {
    export type Ident = string

    export type Loader = string

    export type Options = Framework.Webpack.RuleSetLoader['options']

    export type Query = Framework.Webpack.RuleSetQuery
  }
}
