import type Framework from '@roots/bud-typings'
import * as builders from '../builders'
import {Item} from '../Item'
import {Rule} from '../Rule'

type Cfg = Framework.Webpack.Configuration

export class Build implements Framework.Build.Contract {
  public bud: Framework.Bud.App

  public builders: Partial<Framework.Build.Builders> = builders

  public loaders

  public items

  public rules

  public config

  public constructor(bud: Framework.Bud.App) {
    this.bud = bud

    this.loaders = this.bud.makeContainer()
    this.items = this.bud.makeContainer()
    this.rules = this.bud.makeContainer()
  }

  public make(): Cfg {
    const config = Object.entries(builders).reduce(
      (
        config,
        [, builder]: [
          string,
          (this: Framework.Bud.App) => Partial<Cfg>,
        ],
      ) => ({
        ...config,
        ...builder.bind(this.bud)(this.bud.config),
      }),
      {},
    )

    return this.filterEmpty(config)
  }

  public filterEmpty(
    object: Framework.Index<any>,
  ): {[key: string]: any} {
    return Object.entries(object).reduce((acc, [key, value]) => {
      return !value || value == {} ? acc : {...acc, [key]: value}
    }, {})
  }

  public getLoader(name: string): Framework.Build.Loader {
    return this.loaders.get(name)
  }

  public setLoader(
    this: Build,
    name: string,
    loader: Framework.Build.Loader,
  ): Framework.Build.Loader {
    this.loaders.set(name, loader)

    return this.loaders.get(name)
  }

  public getItem(name: string): Framework.Build.RuleSetLoader {
    return this.items.get(name)
  }

  public setItem(
    name: string,
    module: Framework.Item.Module,
  ): Item {
    this.items.set(name, new Item(this.bud, module).make())

    return this.items.get(name)
  }

  public getRule(name: string): Framework.Webpack.RuleSetRule {
    return this.rules.get(name)
  }

  public setRule(
    name: string,
    module: Framework.Rule.Module,
  ): Framework.Rule.Contract {
    this.rules.set(name, new Rule(this.bud, module).make())

    return this.rules.get(name)
  }
}
