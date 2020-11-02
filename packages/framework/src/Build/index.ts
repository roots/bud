import * as builders from './builders'
import * as config from './config'
import type Webpack from 'webpack'

import {Indexed as Container} from '@roots/container'
import {lodash as _} from '@roots/bud-support'

import {Item} from '../Item'
import {Rule} from '../Rule'

export class Build implements Framework.Build {
  public bud: Framework.Bud

  public builders: Partial<Framework.Build.Builders> = builders

  public loaders: Framework.Index<Framework.Build.Loader> = {}

  public items: Framework.Index<Framework.Item> = {}

  public rules: Framework.Index<Framework.Rule> = {}

  public config: Framework.Container

  public constructor(params?: Framework.Index<Framework.Bud>) {
    this.bud = params.bud
    this.config = new Container(config)
  }

  public make(): Webpack.Configuration {
    const config = Object.entries(builders).reduce(
      (
        config,
        [, builder]: [string, Framework.Build.Builders],
      ) => ({
        ...config,
        ...builder.bind(this.bud)(this.config.all()),
      }),
      {},
    )

    return this.filterEmpty(config)
  }

  public filterEmpty(object) {
    return Object.entries(object).reduce((acc, [key, value]) => {
      return !value || value == {} ? acc : {...acc, [key]: value}
    }, {})
  }

  public getLoader(name: string): Framework.Build.Loader {
    return this.loaders[name]
  }

  public setLoader(
    name: string,
    loader: Framework.Build.Loader,
  ): Framework.Build.Loader {
    this.loaders[name] = loader

    return this.loaders[name]
  }

  public getItem(name: string): Framework.Build.RuleSetLoader {
    return this.items[name].make()
  }

  public setItem(
    name: string,
    module: Framework.Item.Module,
  ): Framework.Item {
    this.items[name] = new Item(this.bud, module)

    return this.items[name]
  }

  public mergeItem(
    item: string,
    value: Partial<Framework.Item.Module>,
  ): void {
    this.setItem(item, _.merge(this.getItem(item), value))
  }

  public getRule(name: string): Webpack.RuleSetRule {
    return this.rules[name].make()
  }

  public setRule(
    name: string,
    module: Framework.Rule.Module,
  ): Rule {
    this.rules[name] = new Rule(this.bud, module)

    return this.rules[name]
  }

  public mergeRule(
    rule: string,
    value: Partial<Framework.Rule>,
  ): void {
    const merged: Partial<Framework.Rule> = {}
    _.merge(merged, this.rules[rule].make(), value)

    this.setRule(rule, merged)
  }
}
