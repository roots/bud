import Service from './Service'
import Item from '../Item'
import Rule from '../Rule'

import * as builders from '../builders'
import type {Framework, Webpack} from '@roots/bud-typings'

export default class extends Service implements Framework.Build {
  public builders: Partial<Framework.Build.Builder> = builders

  public init(): void {
    this.items = this.app.makeContainer({})
    this.rules = this.app.makeContainer({})
    this.loaders = this.app.makeContainer({})
  }

  public getLoader(name: string): Framework.Loader {
    return this.loaders.get(name)
  }

  public setLoader(
    this: Framework.Build,
    name: string,
    loader: Framework.Loader,
  ): Framework.Loader {
    this.loaders.set(name, loader)

    return this.loaders.get(name)
  }

  public getItem(name: string): Item {
    return this.items.get(name)
  }

  public setItem(
    name: string,
    module: Framework.Item.Module,
  ): Framework.Item {
    this.items.set(
      name,
      new Item({app: this.app, module}).make(),
    )

    return this.items.get(name)
  }

  public getRule(name: string): Rule {
    return this.rules.get(name)
  }

  public setRule(
    name: string,
    module: Framework.Rule.Module,
  ): Framework.Rule {
    this.rules.set(
      name,
      new Rule({app: this.app, module}).make(),
    )

    return this.rules.get(name)
  }

  public make(): Webpack.Configuration {
    const config = Object.entries(builders).reduce(
      (
        config,
        [, builder]: [
          string,
          (this: Framework) => Partial<Webpack.Configuration>,
        ],
      ) => ({
        ...config,
        ...builder.bind(this.app)(),
      }),
      {},
    )

    return this.filterEmpty(config)
  }

  private filterEmpty(
    object: Partial<Webpack.Configuration>,
  ): Partial<Webpack.Configuration> {
    return Object.entries(object).reduce((acc, [key, value]) => {
      return !value || value == {} ? acc : {...acc, [key]: value}
    }, {})
  }
}
