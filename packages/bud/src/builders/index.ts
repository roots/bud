import type {
  BuilderDefinition,
  Build,
  Item,
  Rule,
} from '@roots/bud-typings'

import {loaders as loaderDictionary} from './loaders'
import {items as itemDictionary} from './items'
import {rules as ruleDictionary} from './rules'

export const loaders: BuilderDefinition<Build.Loader> = [
  loaderDictionary,
  function (args: [string, Build.Loader]): void {
    this.build.setLoader(...args)
  },
]

export const items: BuilderDefinition<Item.Module> = [
  itemDictionary,
  function (args: [string, Item.Module]): void {
    this.build.setItem(...args)
  },
]

export const rules: BuilderDefinition<Rule.Module> = [
  ruleDictionary,
  function (args: [string, Rule.Module]): void {
    this.build.setRule(...args)
  },
]
