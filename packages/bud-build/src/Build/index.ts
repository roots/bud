import type {
  Framework,
  Container,
  Loader,
  Webpack,
} from '@roots/bud-typings'
import Base from './Build'
import Contract from './Contract'
import Item from '../Item'
import Rule from '../Rule'
import * as builders from '../builders'

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
class Build extends Base implements Contract {
  /**
   * ## bud.build.builders [🏠 Internal]
   *
   * Collection of functions processing loaders, items and rules
   * into a finalized webpack configuration.
   */
  public builders: Partial<Build.Builder> = builders

  /**
   * ## bud.build.loaders
   *
   * Container of available loaders.
   *
   * @see {webpack.Loader}
   */
  public loaders: Container

  /**
   * ## bud.build.items
   *
   * Container of available RuleSetRule['use'] items.
   *
   * @see {webpack.Configuration}
   */
  public items: Container

  /**
   * ## bud.build.rules
   *
   * Container of available RuleSetRules
   *
   * @see {webpack.Configuration}
   */
  public rules: Container

  /**
   * ## bud.build.make
   *
   * Produce a final webpack config.
   */
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
        ...builder.bind(this.bud)(),
      }),
      {},
    )

    return this.filterEmpty(config)
  }

  /**
   * ### bud.build.filterEmpty [🏠 Internal]
   *
   * Filter rubbish config items.
   */
  public filterEmpty(
    object: Partial<Webpack.Configuration>,
  ): Partial<Webpack.Configuration> {
    return Object.entries(object).reduce((acc, [key, value]) => {
      return !value || value == {} ? acc : {...acc, [key]: value}
    }, {})
  }

  /**
   * ### bud.build.getLoader
   *
   * Get a loader from the store.
   */
  public getLoader(name: string): Loader {
    return this.loaders.get(name)
  }

  /**
   * ### bud.build.setLoader
   *
   * Set a loader to the store. Returns the set loader.
   */
  public setLoader(
    this: Build,
    name: string,
    loader: Loader,
  ): Loader {
    this.loaders.set(name, loader)

    return this.loaders.get(name)
  }

  /**
   * ### bud.build.getItem
   *
   * Get an item  from the store.
   */
  public getItem(name: string): Item {
    return this.items.get(name)
  }

  /**
   * ### bud.build.setItem
   *
   * Set an item to the store. Returns the set item.
   */
  public setItem(name: string, module: Item.Module): Item {
    this.items.set(name, new Item(this.bud, module).make())

    return this.items.get(name)
  }

  /**
   * ### bud.build.getRule
   *
   * Get a rule from the store.
   */
  public getRule(name: string): Rule {
    return this.rules.get(name)
  }

  /**
   * ### bud.build.setRule
   *
   * Set a rule to the store. Returns the set rule.
   */
  public setRule(name: string, module: Rule.Module): Rule {
    this.rules.set(name, new Rule(this.bud, module).make())

    return this.rules.get(name)
  }
}

declare namespace Build {
  export type Builder = (
    this: Framework,
    config: Container,
  ) => Partial<Webpack.Configuration>
}

export default Build
