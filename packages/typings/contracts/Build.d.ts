import {Framework} from './'
import {Webpack} from './'

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
export interface Build extends Framework.Service<Framework> {
  /**
   * ## bud.build.builders [🏠 Internal]
   *
   * Collection of functions processing loaders, items and rules
   * into a finalized webpack configuration.
   */
  builders: Partial<Build.Builder>

  /**
   * ## bud.build.loaders
   */
  loaders: Framework.Container

  /**
   * ## bud.build.items
   */
  items: Framework.Container

  /**
   * ## bud.build.rules
   */
  rules: Framework.Container

  /**
   * ## bud.build.make
   *
   * Produce a final webpack config.
   */
  make(): Webpack.Configuration

  /**
   * ## bud.build.getLoader
   *
   * Get a loader from the store.
   */
  getLoader(name: string): Framework.Loader

  /**
   * ## bud.build.setLoader
   *
   * Set a loader to the store. Returns the set loader.
   */
  setLoader(
    name: string,
    loader: Framework.Loader,
  ): Framework.Loader

  /**
   * ## bud.build.getItem
   *
   * Get an item  from the store.
   */
  getItem(name: string): Framework.Item

  /**
   * ## bud.build.setItem
   *
   * Set an item to the store. Returns the set item.
   */
  setItem(name: string, module: Framework.Item): Framework.Item

  /**
   * ## bud.build.getRule
   *
   * Get a rule from the store.
   */
  getRule(name: string): Framework.Rule

  /**
   * ## bud.build.setRule
   *
   * Set a rule to the store. Returns the set rule.
   */
  setRule(name: string, module: Framework.Rule): Framework.Rule
}

export namespace Build {
  export type Builder = (
    this: Framework,
    config: Framework.Container,
  ) => Partial<Webpack.Configuration>
}
