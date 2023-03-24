import type {Items, Loaders, Rules} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework/service'
import type * as Base from '@roots/bud-framework/services/build'
import {bind} from '@roots/bud-support/decorators'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import type {Configuration} from '@roots/bud-support/webpack'

import type {Records} from './config/index.js'
import {register} from './handlers/register.js'
import {Item} from './item/index.js'
import {Loader} from './loader/index.js'
import {Options as RuleOptions, Rule} from './rule/index.js'

/**
 * Webpack configuration builder class
 */
export class Build extends Service implements Base.Service {
  /**
   * Built config object
   */
  public config: Partial<Configuration> = {}

  /**
   * Registered loaders
   */
  public loaders: Loaders = {} as Loaders

  /**
   * Registered rules
   */
  public rules: Rules = {} as Rules

  /**
   * Registered items
   */
  public items: Items = {} as Items

  /**
   * Service register event
   *
   * @remarks
   * `loaders`, `items`, and `rules` are instantiated dumbly
   * because it is painful to think about how to map the typings..
   */
  public override register? = register.bind(this)

  /**
   * Make webpack configuration
   */
  @bind
  public async make(): Promise<Configuration> {
    this.logger.log(`bud.build.make called`)
    await this.app.hooks.fire(`build.before`, this.app)

    await import(`./config/index.js`).then(
      async (records: Records) =>
        await Promise.all(
          Object.entries(records).map(async ([prop, factory]) => {
            try {
              const value = await factory(this.app)
              if (isUndefined(value)) return

              this.config[prop] = value
              this.logger.success(`built`, prop)
            } catch (error) {
              throw error
            }
          }),
        ),
    )

    this.logger.success(`configuration successfully built`)
    await this.app.hooks.fire(`build.after`, this.app)

    return this.config
  }

  /**
   * Get rule
   */
  @bind
  public getRule<K extends `${keyof Rules & string}`>(ident: K): Rules[K] {
    return this.rules[ident]
  }

  /**
   * Set Rule
   */
  @bind
  public setRule<K extends `${keyof Rules & string}`>(
    name: K,
    input?: RuleOptions | Rule,
  ): this {
    this.rules[name] =
      input instanceof Rule
        ? input
        : isFunction(input)
        ? input(this.makeRule())
        : this.makeRule(input as any)

    return this
  }

  /**
   * Make Rule
   */
  @bind
  public makeRule(options?: RuleOptions): Rule {
    return new Rule(() => this.app, options)
  }

  /**
   * Get loader
   */
  @bind
  public getLoader(name: string): Loader {
    if (!this.loaders[name])
      this.logger.error(
        `loader ${name} was requested but is not registered`,
      )

    return this.loaders[name]
  }
  /**
   * Set loader
   */
  @bind
  public setLoader<K extends `${keyof Loaders & string}`>(
    name: K,
    definition?: any,
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
   * Make loader
   */
  @bind
  public makeLoader(src?: string, definition?: string): Loader {
    return new Loader(() => this.app, src)
  }

  /**
   * Get item
   */
  @bind
  public getItem(name: `${keyof Items & string}`): Item {
    if (!this.items[name])
      this.logger.error(
        `loader ${name} was requested but is not registered`,
      )

    return this.items[name]
  }

  /**
   * Set item
   */
  @bind
  public setItem<K extends `${keyof Items & string}`>(
    ident: K,
    options?: Items[K]['options'] | ((item: Items[K]) => Items[K]),
  ): this {
    const maybeOptionsCallback = isUndefined(options)
      ? {ident, loader: ident}
      : options

    const item = isFunction(maybeOptionsCallback)
      ? maybeOptionsCallback(this.makeItem())
      : this.makeItem(maybeOptionsCallback)

    this.items[ident] = item
    this.logger.info(`set item`, item)

    return this
  }

  /**
   * Make item
   */
  @bind
  public makeItem(options?: Partial<Item['options']>): Item {
    return new Item(() => this.app, options)
  }
}
