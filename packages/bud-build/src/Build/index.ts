import * as builders from '../builders'
import * as config from '../config'
import {Item} from '../Item'
import {Rule} from '../Rule'

import type Webpack from 'webpack'
import Framework, {Bud, Index, Indexed} from '@roots/bud-typings'

export class Build implements Framework.Build {
  public bud: Bud

  public builders: Partial<Framework.Build.Builders> = builders

  public loaders: Indexed

  public items: Indexed

  public rules: Indexed

  public config: Indexed

  public constructor(params?: Index<Framework.Bud>) {
    this.bud = params.bud
    this.config = this.bud.makeContainer(config)
    this.loaders = this.bud.makeContainer({})
    this.items = this.bud.makeContainer({})
    this.rules = this.bud.makeContainer({})
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

  public filterEmpty(object: Index<any>): {[key: string]: any} {
    return Object.entries(object).reduce((acc, [key, value]) => {
      return !value || value == {} ? acc : {...acc, [key]: value}
    }, {})
  }

  public getLoader(name: string): Framework.Build.Loader {
    return this.loaders.get(name)
  }

  public setLoader(
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
  ): Framework.Item {
    this.items.set(name, new Item(this.bud, module).make())
    return this.items.get(name)
  }

  public getRule(name: string): Webpack.RuleSetRule {
    return this.rules.get(name)
  }

  public setRule(name: string, module: Framework.Rule): Rule {
    this.rules.set(name, new Rule(this.bud, module).make())
    return this.rules.get(name)
  }
}
