import type {Bud, Build as BudBuild} from '@roots/bud-framework'
import type {Items, Loaders, Rules} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-framework/config'

import Item from '@roots/bud-build/item'
import Loader from '@roots/bud-build/loader'
import {register} from '@roots/bud-build/registry'
import Rule, {type Options as RuleOptions} from '@roots/bud-build/rule'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import isFunction from '@roots/bud-support/isFunction'
import isUndefined from '@roots/bud-support/isUndefined'

/**
 * {@link BudBuild}
 */
class Build extends Service implements BudBuild {
  /**
   * {@link BudBuild.config}
   */
  public config: Partial<Configuration> = {}

  /**
   * {@link BudBuild.items}
   */
  public declare items: Items

  /**
   * {@link BudBuild.loaders}
   */
  public declare loaders: Loaders

  /**
   * {@link BudBuild.register}
   */
  public override register? = register.bind(this)

  /**
   * {@link BudBuild.rules}
   */
  public declare rules: Rules

  /**
   * {@link Service.register}
   */
  @bind
  public override async bootstrap?(app: Bud) {
    this.items = {} as Items
    this.loaders = {} as Loaders
    this.rules = {} as Rules
  }

  /**
   * {@link BudBuild.getItem}
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
   * {@link BudBuild.getLoader}
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
   * {@link BudBuild.getRule}
   */
  @bind
  public getRule<K extends `${keyof Rules & string}`>(ident: K): Rules[K] {
    return this.rules[ident]
  }

  /**
   * {@link BudBuild.make}
   */
  @bind
  public async make(): Promise<Partial<Configuration>> {
    this.logger.log(`bud.build.make called`)
    await this.app.hooks.fire(`build.before`, this.app)

    await import(`@roots/bud-build/config`)
      .then(
        async records =>
          await Promise.all(
            Object.entries(records).map(async ([prop, factory]) => {
              const value = await factory(this.app).catch(this.catch)
              if (isUndefined(value)) {
                this.logger.success(`omitting:`, prop, `(undefined)`)
                return
              }

              Object.defineProperty(this.config, prop, {
                configurable: true,
                enumerable: true,
                value,
                writable: true,
              })

              this.logger
                .success(`defined:`, prop, `(${typeof this.config[prop]})`)
                .info(prop, `info:`, this.config[prop])
            }),
          ),
      )
      .catch(this.catch)

    this.logger.success(`configuration built`)
    this.logger.info(this.config)

    await this.app.hooks.fire(`build.after`, this.app).catch(this.catch)

    return Object.entries(this.config).reduce((a, [k, v]) => {
      if (isUndefined(v)) return a
      return {...a, [k]: v}
    }, {})
  }

  /**
   * {@link BudBuild.makeItem}
   */
  @bind
  public makeItem(options?: Partial<Item['options']>): Item {
    return new Item(() => this.app, options)
  }

  /**
   * {@link BudBuild.makeLoader}
   */
  @bind
  public makeLoader(src?: string, definition?: string): Loader {
    return new Loader(() => this.app, src, definition)
  }

  /**
   * {@link BudBuild.makeRule}
   */
  @bind
  public makeRule(options?: RuleOptions): Rule {
    return new Rule(() => this.app, options)
  }

  /**
   * {@link BudBuild.setItem}
   */
  @bind
  public setItem<K extends `${keyof Items & string}`>(
    ident: K,
    definition?: ((item: Items[K]) => Items[K]) | Items[K],
  ): this {
    this.logger.log(`build.setItem`, ident)
    const maybeOptionsCallback = isUndefined(definition)
      ? {ident, loader: ident}
      : definition

    const item = isFunction(maybeOptionsCallback)
      ? maybeOptionsCallback(this.makeItem())
      : this.makeItem(maybeOptionsCallback)

    this.items[ident] = item
    this.logger.info(item)

    return this
  }

  /**
   * {@link BudBuild.setLoader}
   */
  @bind
  public setLoader<K extends `${keyof Loaders & string}`>(
    name: K,
    definition?: any,
  ): this {
    this.logger.log(`build.setLoader`, name)
    const loader = isUndefined(definition)
      ? this.makeLoader(name)
      : definition instanceof Loader
        ? definition
        : this.makeLoader(definition)

    this.loaders[name] = loader
    this.logger.info(loader)

    return this
  }

  /**
   * {@link BudBuild.setRule}
   */
  @bind
  public setRule<K extends `${keyof Rules & string}`>(
    name: K,
    definition?: Rule | RuleOptions,
  ): this {
    this.logger.log(`build.setRule`, name)
    const rule =
      definition instanceof Rule
        ? definition
        : isFunction(definition)
          ? definition(this.makeRule())
          : this.makeRule(definition as any)

    this.rules[name] = rule
    this.logger.info(rule)

    return this
  }
}

export {Build as default}
