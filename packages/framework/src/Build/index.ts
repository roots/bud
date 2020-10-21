import * as builders from './builders'
import * as config from './config'

import {Indexed as Container} from '@roots/container'
import {lodash as _} from '@roots/bud-support'

import {Item} from '../Item'
import {Rule} from '../Rule'

export class Build implements Build {
  public bud: Framework.Bud

  public builders: Partial<Framework.Build.Builders> = builders

  public loaders: Framework.Index<Framework.Build.Loader> = {}

  public items: Framework.Index<Framework.Item> = {}

  public rules: Framework.Index<Framework.Rule> = {}

  public config: Framework.Container

  public constructor(bud: Framework.Bud) {
    this.bud = bud
    this.config = new Container(config)
  }

  public make(): Framework.Webpack.Configuration {
    return Object.entries(builders).reduce(
      (
        config,
        [, builder]: [string, Framework.Build.Builders],
      ) => ({
        ...config,
        ...builder.bind(this.bud)(this.config.all()),
      }),
      {},
    )
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

  public getItem(name: string): Framework.Item.Product {
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
    value: Partial<Framework.Item>,
  ): void {
    const merged: Partial<Framework.Item> = {}
    _.merge(merged, this.items[item].make(), value)

    this.setItem(item, merged)
  }

  public getRule(name: string): Framework.Webpack.RuleSetRule {
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
