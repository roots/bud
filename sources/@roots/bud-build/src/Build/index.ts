import * as Bud from '@roots/bud-framework'
import {bind, fs, lodash} from '@roots/bud-support'
import {isFunction} from 'lodash'
import type {Configuration} from 'webpack'

import Item from '../Item'
import * as items from '../items'
import Loader from '../Loader'
import * as loaders from '../loaders'
import Rule from '../Rule'
import * as rules from '../rules'
import * as config from './config'

const {isUndefined} = lodash
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
    const reducer = (
      a: Bud.Build.Rules | Bud.Build.Items | Bud.Build.Loaders,
      [k, v],
    ) => ({
      ...a,
      [k]: v(this.app),
    })

    Object.assign(this, {
      loaders: this.app
        .container(loaders)
        .getEntries()
        .reduce(reducer, this.loaders),
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
  public makeItem(options?: {
    options?: Item['options']
    loader?: Item['loader']
  }): Item {
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
