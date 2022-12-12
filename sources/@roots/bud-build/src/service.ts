import type {Items, Loaders, Rules} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework/service'
import type * as Base from '@roots/bud-framework/services/build'
import {bind} from '@roots/bud-support/decorators'
import {isFunction, isUndefined} from '@roots/bud-support/lodash-es'
import type {Configuration} from '@roots/bud-support/webpack'

import type {Records} from './config/index.js'
import {register} from './handlers/register.js'
import {Item} from './item/index.js'
import {Loader} from './loader/index.js'
import {Options as RuleOptions, Rule} from './rule/index.js'

/**
 * Webpack configuration builder class
 *
 * @public
 */
export class Build extends Service implements Base.Service {
  /**
   * @public
   */
  public static override label = `build`

  /**
   * @public
   */
  public config: Partial<Configuration> = {}

  /**
   * Registered loaders
   *
   * @public
   */
  // @ts-ignore
  public loaders: Loaders = {}

  /**
   * Registered rules
   *
   * @public
   */
  // @ts-ignore
  public rules: Rules = {}

  /**
   * Registered items
   *
   * @public
   */
  // @ts-ignore
  public items: Items = {}

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
  public override register? = register.bind(this)

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
      throw error
    }

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

    await this.app.hooks.fire(`build.after`)
    return this.config
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
    input?: RuleOptions | Rule,
  ): this {
    this.rules[name] =
      input instanceof Rule
        ? input
        : isFunction(input)
        ? input(this.makeRule())
        : this.makeRule(input as any)

    this.logger.success(`set rule:`, name)
    this.logger.info(`\n`, this.rules[name])

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
  public makeRule(options?: RuleOptions): Rule {
    return new Rule(() => this.app, options)
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
   * Make Loader
   *
   * @param options - rule constructor properties
   * @returns the rule
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public makeLoader(src?: string): Loader {
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
    options?: Items[K]['options'] | ((item: Items[K]) => Items[K]),
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
