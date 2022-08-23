import {Service} from '@roots/bud-framework/service'
import {bind} from 'helpful-decorators'
import {isFunction, isUndefined} from 'lodash-es'
import type {Configuration} from 'webpack'

import * as config from './config/builder.js'
import * as items from './handlers/items.js'
import * as loaders from './handlers/loaders.js'
import * as rules from './handlers/rules.js'
import Item from './item.js'
import Loader from './loader.js'
import * as Rule from './rule/rule.js'

/**
 * Webpack configuration builder class
 *
 * @public
 */
export default class Build extends Service {
  public static label = `build`

  /**
   * @public
   */
  public config: Partial<Configuration> = {}

  /**
   * Registered loaders
   *
   * @public
   */
  public loaders: Record<string, Loader> = {}

  /**
   * Registered rules
   *
   * @public
   */
  public rules: Record<string, Rule.Instance> = {}

  /**
   * Registered items
   *
   * @public
   */
  public items: Record<string, Item> = {}

  /**
   * Make webpack configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async make(): Promise<Configuration> {
    this.app.log(`bud.build.make called`)
    try {
      await this.app.hooks.fire(`build.before`)
    } catch (error) {
      this.app.error(error)
    }

    await Promise.all(
      [
        [`entry`],
        [`plugins`, true],
        [`resolve`, true],
        [`bail`],
        [`cache`],
        [`context`],
        [`devtool`],
        [`experiments`],
        [`externals`],
        [`externalsType`],
        [`infrastructureLogging`],
        [`loader`],
        [`mode`],
        [`module`],
        [`name`],
        [`node`],
        [`output`],
        [`optimization`],
        [`parallelism`],
        [`performance`],
        [`profile`],
        [`recordsPath`],
        [`stats`],
        [`target`],
        [`watch`],
        [`watchOptions`],
      ].map(async ([propKey, isAsync]: [keyof Configuration, boolean]) => {
        const propValue = config[propKey]
          ? await config[propKey](this.app)
          : isAsync === true
          ? await this.app.hooks.filterAsync(`build.${propKey}` as any)
          : this.app.hooks.filter(`build.${propKey}` as any)

        this.app.info(
          propKey,
          `generated value`,
          `=>`,
          propValue,
          `async?`,
          isAsync ?? false,
        )
        if (isUndefined(propValue)) return

        this.config[propKey as any] = propValue as any
      }),
    )

    this.app.log(`configuration built`, this.config)

    await this.app.hooks.fire(`build.after`)

    return this.config
  }

  /**
   * Service register event
   *
   * @remarks
   * `loaders`, `items`, and `rules` are instantiated dumbly
   * because it is painful to think about how to map the typings..
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    await Promise.all(
      Object.entries(rules).map(async ([key, ruleFactory]) => {
        const value = await ruleFactory(this)
        this.rules[key] = value
      }),
    )

    await Promise.all(
      Object.entries(items).map(async ([key, itemFactory]) => {
        const value = await itemFactory(this.app)
        this.items[key] = value as Item
      }),
    )

    this.items.precss = this.app.isProduction
      ? this.items.minicss
      : this.items.style

    await Promise.all(
      Object.entries(loaders).map(async ([key, loaderFactory]) => {
        const value = await loaderFactory(this.app)
        this.loaders[key] = value as Loader
      }),
    )

    await config.build(this.app)
  }

  /**
   * Set Rule
   *
   * @param name - Rule key
   * @param options - Rule constructor properties
   * @returns the Rule
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setRule(name: string, options?: Rule.Options): this {
    const processedOptions = isFunction(options)
      ? options(this.makeRule())
      : this.makeRule(options)

    Object.assign(this.rules, {[name]: processedOptions})

    return this
  }

  /**
   * Make Rule
   *
   * @param options - rule constructor properties
   * @returns the rule
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public makeRule(options?: Rule.Options): Rule.Instance {
    return new Rule.default(() => this.app, options)
  }

  /**
   * Set Loader
   *
   * @param name - Loader key
   * @param options - Loader constructor properties
   * @returns the Loader
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setLoader(name: string, options: string): this {
    Object.assign(this.loaders, {[name]: this.makeLoader(options)})

    return this
  }

  /**
   * Make Loader
   *
   * @param options - rule constructor properties
   * @returns the rule
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public makeLoader(options: string): Loader {
    return new Loader(() => this.app, options)
  }

  /**
   * Set Item
   *
   * @param name - Item key
   * @param options - Item constructor properties
   * @returns the Item
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setItem(name: string, options: (item: Item) => Item): this {
    const processedOptions = isFunction(options)
      ? options(this.makeItem())
      : this.makeItem(options)

    Object.assign(this.items, {[name]: processedOptions})

    return this
  }

  /**
   * Make Item
   *
   * @param options - rule constructor properties
   * @returns the rule
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public makeItem(options?: Partial<Item['options']>): Item {
    return new Item(() => this.app, options)
  }
}
