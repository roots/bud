import * as Bud from '@roots/bud-framework'
import fs from 'fs-extra'
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

const {ensureFile, writeFile} = fs

/**
 * Webpack configuration builder class
 *
 * @public
 */
export class Build extends Bud.Service implements Bud.Build.Service {
  /**
   * @public
   */
  public config: Partial<Configuration> = {}

  /**
   * Registered loaders
   *
   * @public
   */
  public loaders: Bud.Build.Loaders = {}

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
   * Service booted event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async registered() {
    this.app.hooks.action('event.build.after', this.writeFinalConfig)
  }

  /**
   * Make webpack configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async make(): Promise<Configuration> {
    await this.app.hooks.fire('event.build.before')

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

    await this.app.hooks.fire('event.build.after')

    return this.config
  }

  /**
   * Service register event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    const reducer = (a: Bud.Build.Rules | Bud.Build.Items, [k, v]) => {
      const obj = v(this.app)
      return {...a, [k]: obj}
    }

    await Promise.all(
      this.app
        .container(loaders)
        .getEntries()
        .map(async ([key, fn]) => {
          this.loaders[key] = await fn(this.app)
        }),
    )

    Object.assign(this, {
      rules: this.app
        .container(rules)
        .getEntries()
        .reduce(reducer, this.rules),
      items: this.app
        .container(items)
        .getEntries()
        .reduce(reducer, this.items),
    })

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
  public setRule(name: string, options?: Bud.Build.Rule.Options): Build {
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
  public setLoader(name: string, options: string): Build {
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
  ): Build {
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

  /**
   * Write final configuration to storage directory
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async writeFinalConfig(): Promise<void> {
    try {
      const filePath = this.app.path(
        `@storage/${this.app.name}/webpack.config.js`,
      )

      await ensureFile(filePath)
      await writeFile(
        filePath,
        `module.exports = ${this.app.json.stringify(
          this.config,
          null,
          2,
        )}`,
      )
    } catch (error) {
      this.app.error(`failed to write webpack.config.json`)
    }
  }
}
