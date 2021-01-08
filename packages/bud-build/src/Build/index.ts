import type {
  Framework,
  Loader,
  Item,
  Rule,
} from '@roots/bud-typings'
import * as builders from '../builders'
import Service from './Service'

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
export default class extends Service implements Framework.Build {
  /**
   * ## bud.build.builders [🏠 Internal]
   *
   * Collection of functions processing loaders, items and rules
   * into a finalized webpack configuration.
   */
  public builders: Partial<Framework.Build.Builder> = builders

  /**
   * ## bud.build.loaders
   *
   * Container of available loaders.
   *
   * @see {webpack.Loader}
   */
  public loaders: Framework.Container

  /**
   * ## bud.build.items
   *
   * Container of available RuleSetRule['use'] items.
   *
   * @see {webpack.Configuration}
   */
  public items: Framework.Container

  /**
   * ## bud.build.rules
   *
   * Container of available RuleSetRules
   *
   * @see {webpack.Configuration}
   */
  public rules: Framework.Container

  /**
   * Service registration
   */
  public register(): void {
    this.make = this.make.bind(this)
    this.filterEmpty = this.filterEmpty.bind(this)

    this.getLoader = this.getLoader.bind(this)
    this.setLoader = this.setLoader.bind(this)

    this.getItem = this.getItem.bind(this)
    this.setItem = this.setItem.bind(this)

    this.getRule = this.getRule.bind(this)
    this.setRule = this.setRule.bind(this)

    this.loaders.every((name: string, loader: Loader) => {
      this.setLoader(name, loader)
    })

    this.items.every((name: string, item: Item) => {
      this.setItem(name, item)
    })

    this.rules.every((name: string, rule: Rule) => {
      this.setRule(name, rule)
    })
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
          (this: Framework) => Partial<Configuration>,
        ],
      ) => ({
        ...config,
        ...builder.bind(this.app)(),
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
    object: Partial<Configuration>,
  ): Partial<Configuration> {
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
    name: string,
    loader: Framework.Loader,
  ): Framework.Loader {
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
  public setItem(name: string, module: Item): Item {
    this.items.set(
      name,
      Object.fromEntries(
        Object.entries(module)
          .map(([k, v]) => [k, this.app.access(v)])
          .map(([k, v]) => {
            if (k == 'loader') {
              return [k, this.loaders.get(v)]
            }

            return [k, v]
          }),
      ),
    )

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
  public setRule(name: string, module: Rule): Rule {
    this.rules.set(
      name,
      Object.fromEntries(
        Object.entries(module).map(([k, v]) => [
          k,
          this.app.access(v),
        ]),
      ),
    )

    return this.rules.get(name)
  }
}
