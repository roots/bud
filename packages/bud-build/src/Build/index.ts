import type Framework from '@roots/bud-typings'
import * as builders from '../builders'
import {Item} from '../Item'
import {Rule} from '../Rule'

export type Configuration = Framework.Webpack.Configuration

/**
 * ## bud.build
 *
 * Webpack configuration builder for the @roots/bud framework
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export class Build implements Framework.Build.Contract {
  public bud: Framework.Bud.Ref

  /**
   * ## bud.build.builders
   *
   * Collection of functions processing loaders, items and rules
   * into a finalized webpack configuration.
   */
  public builders: Partial<Framework.Build.Builder> = builders

  /**
   * ## bud.build.loaders
   *
   * @see {webpack.Loader}
   */
  public loaders: Framework.Container<Framework.Loader>

  /**
   * ## bud.build.items
   *
   * @see {webpack.Configuration}
   */
  public items: Framework.Container<Framework.Item.Module>

  /**
   * ## bud.build.items
   *
   * @see {webpack.Configuration}
   */
  public rules: Framework.Container<Framework.Rule.Module>

  /**
   * Constructor
   */
  public constructor(bud: Framework.Bud.Contract) {
    this.bud = bud.get

    this.loaders = bud.makeContainer<Framework.Loader>()
    this.items = bud.makeContainer<Framework.Item.Module>({})
    this.rules = bud.makeContainer<Framework.Rule.Module>({})
  }

  /**
   * ## bud.build.make
   *
   * Produce a final webpack config.
   */
  public make(): Configuration {
    const config = Object.entries(builders).reduce(
      (
        config,
        [, builder]: [
          string,
          (
            this: Framework.Bud.Contract,
          ) => Partial<Configuration>,
        ],
      ) => ({
        ...config,
        ...builder.bind(this.bud())(),
      }),
      {},
    )

    return this.filterEmpty(config)
  }

  /**
   * ### bud.build.filterEmpty
   *
   * Filter rubbish config items.
   */
  public filterEmpty(
    object: Partial<Configuration>,
  ): Partial<Configuration> {
    return Object.entries(object).reduce((acc, [key, value]) => {
      return !value || value == {} ? acc : {...acc, [key]: value}
    }, {})
  }

  public getLoader(name: string): Framework.Loader {
    return this.loaders.get(name)
  }

  public setLoader(
    this: Build,
    name: string,
    loader: Framework.Loader,
  ): Framework.Loader {
    this.loaders.set(name, loader)

    return this.loaders.get(name)
  }

  public getItem(name: string): Framework.Item.RuleSetLoader {
    return this.items.get(name)
  }

  public setItem(
    name: string,
    module: Framework.Item.Module,
  ): Item {
    this.items.set(name, new Item(this.bud(), module).make())

    return this.items.get(name)
  }

  public getRule(name: string): Framework.Webpack.RuleSetRule {
    return this.rules.get(name)
  }

  public setRule(
    name: string,
    module: Framework.Rule.Module,
  ): Framework.Rule.Contract {
    this.rules.set(name, new Rule(this.bud(), module).make())

    return this.rules.get(name)
  }
}
