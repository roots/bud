import * as Service from '@roots/bud-framework/service'
import type * as Base from '@roots/bud-framework/services/build'
import type {
  Items,
  Loaders,
  Rules,
} from '@roots/bud-framework/src/types/services/build/registry.js'
import {bind} from '@roots/bud-support/decorators'
import {isFunction, isUndefined} from '@roots/bud-support/lodash-es'
import type {Configuration} from 'webpack'

import type {ValueFactory} from './config/builder.js'
import * as items from './handlers/items.js'
import * as loaders from './handlers/loaders.js'
import * as rules from './handlers/rules/rules.js'
import Item from './item/item.js'
import Loader from './loader/loader.js'
import * as Rule from './rule/rule.js'

/**
 * Webpack configuration builder class
 *
 * @public
 */
export default class Build extends Service.Base implements Base.Service {
  /**
   * @public
   */
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
  public loaders: Record<`${keyof Loaders & string}`, Loader> = {}

  /**
   * Registered rules
   *
   * @public
   */
  public rules: Record<`${keyof Rules & string}`, Rule.Interface> = {}

  /**
   * Registered items
   *
   * @public
   */
  public items: Record<`${keyof Items & string}`, Item> = {}

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
      this.logger.error(error)
    }

    await import(`./config/builder.js`).then(
      async (obj: {
        [K in keyof Configuration as `${K & string}`]: ValueFactory<K>
      }) =>
        await Promise.all(
          Object.entries(obj).map(async ([prop, factory]) => {
            const value = await factory(this.app)
            if (isUndefined(value)) return
            this.logger.success(`built`, prop)
            this.logger.info(value)
            this.config[prop] = value
          }),
        ),
    )

    this.logger.success(`configuration successfully built`)

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
    Object.entries(loaders).map(([key, loaderFactory]) => {
      const value = loaderFactory(this.app)
      this.setLoader(key, value)
    })

    Object.entries(items).map(([key, itemFactory]) => {
      const value = itemFactory(this.app)
      this.setItem(key, value as any)
    })

    this.items.precss = this.app.isProduction
      ? this.items.minicss
      : this.items.style

    Object.entries(rules)
      .reverse()
      .map(([key, ruleFactory]) => {
        this.setRule(key, ruleFactory(this.app))
      })
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
  public setRule<K extends `${keyof Rules & string}`>(
    name: K,
    options?: Rule.Options | Rule.Interface,
  ): this {
    if (options instanceof Rule.default) {
      this.rules[name] = options
      this.logger.info(`set rule`, name, this.rules[name])
      return this
    }

    this.rules[name] = isFunction(options)
      ? options(this.makeRule())
      : this.makeRule(options as any)
    this.logger.info(`set rule`, name, this.rules[name])

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
  public makeRule(options?: Rule.Options): Rule.Interface {
    return new Rule.default(() => this.app, options)
  }

  @bind
  public getLoader(name: string): Loader {
    if (!this.loaders[name])
      this.logger.error(
        `loader ${name} was requested but is not registered`,
      )

    return this.loaders[name]
  }

  /**
   * Set Loader
   *
   * @param name - Loader key
   * @param definition - Loader constructor properties
   * @returns the Loader
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setLoader<K extends `${keyof Loaders & string}`>(
    name: K,
    definition?: string | Loader,
  ): this {
    const loader = isUndefined(definition)
      ? this.makeLoader(name)
      : definition instanceof Loader
      ? definition
      : this.makeLoader(definition)

    this.loaders[name] = loader
    this.logger.info(`set loader`, loader)

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
  public makeLoader(src: string): Loader {
    return new Loader(() => this.app, src)
  }

  @bind
  public getItem(name: `${keyof Items & string}`): Item {
    if (!this.items[name])
      this.logger.error(
        `loader ${name} was requested but is not registered`,
      )

    return this.items[name]
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
  public setItem<K extends `${keyof Items & string}`>(
    name: K,
    options?: Item | ((item: Item) => Item),
  ): this {
    const maybeOptionsCallback = isUndefined(options)
      ? {ident: name, loader: name}
      : options

    const item = isFunction(maybeOptionsCallback)
      ? maybeOptionsCallback(this.makeItem())
      : this.makeItem(maybeOptionsCallback)

    this.items[name] = item
    this.logger.info(`set item`, item)

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
