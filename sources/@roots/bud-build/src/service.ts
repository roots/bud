import type * as Bud from '@roots/bud-framework'
import {Service} from '@roots/bud-framework/service'
import {bind} from 'helpful-decorators'
import {isFunction, isUndefined} from 'lodash-es'
import type {Configuration} from 'webpack'

import * as config from './config/index.js'
import * as items from './handlers/items.js'
import * as loaders from './handlers/loaders.js'
import * as rules from './handlers/rules.js'
import Item from './item.js'
import Loader from './loader.js'
import Rule from './rule.js'

/**
 * Webpack configuration builder class
 *
 * @public
 */
export default class Build extends Service implements Bud.Build.Service {
  /**
   * @public
   */
  public config: Partial<Configuration> = {}

  /**
   * Registered loaders
   *
   * @public
   */
  public loaders: Bud.Build.Loaders

  /**
   * Registered rules
   *
   * @public
   */
  public rules: Bud.Build.Rules

  /**
   * Registered items
   *
   * @public
   */
  public items: Bud.Build.Items

  /**
   * Make webpack configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async make(): Promise<Configuration> {
    await this.app.extensions.runAll('_beforeBuild')
    await this.app.hooks.fire('build.before')

    await Promise.all(
      [
        ['entry'],
        ['plugins', true],
        ['resolve', true],
        ['bail'],
        ['cache'],
        ['context'],
        ['devtool'],
        ['experiments'],
        ['externals'],
        ['externalsType'],
        ['infrastructureLogging'],
        ['loader'],
        ['mode'],
        ['module'],
        ['name'],
        ['node'],
        ['output'],
        ['optimization'],
        ['parallelism'],
        ['performance'],
        ['profile'],
        ['recordsPath'],
        ['stats'],
        ['target'],
        ['watch'],
        ['watchOptions'],
      ].map(async ([propKey, isAsync]: [keyof Configuration, boolean]) => {
        const propValue =
          isAsync === true
            ? await this.app.hooks.filterAsync(`build.${propKey}` as any)
            : this.app.hooks.filter(`build.${propKey}` as any)

        if (isUndefined(propValue)) return

        Object.assign(this.config, {[propKey]: propValue})

        return Promise.resolve()
      }),
    )

    await this.app.hooks.fire('build.after')

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
      Object.entries(loaders).map(async ([key, loaderFactory]) => {
        const value = await loaderFactory(this.app)
        if (!this.loaders) this.loaders = {[key]: value}
        else this.loaders[key] = value
      }),
    )

    await Promise.all(
      Object.entries(items).map(async ([key, itemFactory]) => {
        const value = await itemFactory(this.app)
        if (!this.items) this.items = {[key]: value}
        else this.items[key] = value
      }),
    )

    this.items.precss = this.app.isProduction
      ? this.items.minicss
      : this.items.style

    await Promise.all(
      Object.entries(rules).map(async ([key, ruleFactory]) => {
        const value = await ruleFactory(this.app)
        if (!this.rules) this.rules = {[key]: value}
        else this.rules[key] = value
      }),
    )

    await config.builder.build(this.app)
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
  public setRule(name: string, options?: Bud.Build.Rule.Options): this {
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
  public makeRule(options?: Bud.Build.Rule.Options): Rule {
    return new Rule(() => this.app, options)
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
  public setItem(
    name: string,
    options:
      | ((item: Bud.Build.Item) => Bud.Build.Item)
      | Bud.Build.Item.ConstructorOptions,
  ): this {
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
