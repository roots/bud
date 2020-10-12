import {Configuration} from 'webpack'

import {Item} from './Item'
import {Rule} from './Rule'

import * as builders from './builders'
import * as config from './config'
import Container from '@roots/container'

export class Build {
  public bud: Framework.Bud

  public builders: Partial<Build.Builders> = builders

  public loaders: Framework.Index<Build.Loader>

  public items: Framework.Index<Item>

  public rules: Framework.Index<Rule>

  public config: Container

  public constructor(bud: Framework.Bud) {
    this.bud = bud
    this.compile = this.compile.bind(this)
    this.config = new Container(config)
    this.loaders = {}
    this.items = {}
    this.rules = {}
  }

  public compile(this: Framework.Bud): Configuration {
    return Object.entries(builders).reduce(
      (config, [, builder]: [string, Build.Builders]) => ({
        ...config,
        ...builder.bind(this.bud)(this.config.all()),
      }),
      {},
    )
  }

  public makeLoader(
    name: string,
    loader: Build.Loader,
  ): Build.Loader {
    this.loaders[name] = loader
    return loader
  }

  public makeItem(
    name: string,
    module: Build.Item.Module,
  ): Item {
    this.items[name] = new Item(this.bud, module)
    return this.items[name]
  }

  public makeRule(
    name: string,
    module: Build.Rule.Module,
  ): Rule {
    this.rules[name] = new Rule(this.bud, module)
    return this.rules[name]
  }
}
