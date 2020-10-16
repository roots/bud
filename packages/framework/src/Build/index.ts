import webpack, {Configuration} from 'webpack'

import {Item} from './Item'
import {Rule} from './Rule'

import * as builders from './builders'
import * as config from './config'
import {Container} from '@roots/container'
import {lodash as _} from '@roots/bud-support'

export {Build}

class Build implements Framework.Build {
  public bud: Framework.Bud

  public builders: Partial<Build.Builders> = builders

  public loaders: Framework.Index<Build.Loader> = {}

  public items: Framework.Index<Item> = {}

  public rules: Framework.Index<Rule> = {}

  public config: Container

  public constructor(bud: Framework.Bud) {
    this.bud = bud
    this.config = new Container(config)
  }

  public compile(): Configuration {
    return Object.entries(builders).reduce(
      (config, [, builder]: [string, Build.Builders]) => ({
        ...config,
        ...builder.bind(this.bud)(this.config.all()),
      }),
      {},
    )
  }

  public getLoader(name: string): Build.Loader {
    return this.loaders[name]
  }

  public setLoader(
    name: string,
    loader: Build.Loader,
  ): Build.Loader {
    this.loaders[name] = loader

    return this.loaders[name]
  }

  public getItem(name: string): Build.Item.Product {
    return this.items[name].make()
  }

  public setItem(name: string, module: Build.Item.Module): Item {
    this.items[name] = new Item(this.bud, module)

    return this.items[name]
  }

  public mergeItem(
    item: string,
    value: Partial<Build.Item>,
  ): void {
    const merged: Partial<Build.Item> = {}
    _.merge(merged, this.items[item].make(), value)

    this.setItem(item, merged)
  }

  public getRule(name: string): webpack.RuleSetRule {
    return this.rules[name].make()
  }

  public setRule(name: string, module: Build.Rule.Module): Rule {
    this.rules[name] = new Rule(this.bud, module)
    return this.rules[name]
  }

  public mergeRule(
    rule: string,
    value: Partial<Build.Rule>,
  ): void {
    const merged: Partial<Build.Rule> = {}
    _.merge(merged, this.rules[rule].make(), value)

    this.setRule(rule, merged)
  }
}
