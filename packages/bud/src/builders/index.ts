import type {
  Bud,
  Index,
  Item,
  Build,
  Rule,
} from '@roots/bud-typings'

import * as loaders from './loaders'
import * as items from './items'
import * as rules from './rules'

export const builders: Builders = [
  [
    loaders,
    function (
      this: Bud,
      [name, loader]: [string, Build.Loader],
    ): void {
      this.build.setLoader(name, loader)
    },
  ],
  [
    items,
    function (
      this: Bud,
      [name, item]: [string, Item.Module],
    ): void {
      this.build.setItem(name, item)
    },
  ],
  [
    rules,
    function (
      this: Bud,
      [name, rule]: [string, Rule.Module],
    ): void {
      this.build.setRule(name, rule)
    },
  ],
]

export type Builders = Array<
  [
    Index<any>,
    (
      this: Bud,
      [name, loader]: [
        string,
        Build.Loader | Item.Module | Rule.Module,
      ],
    ) => void,
  ]
>
