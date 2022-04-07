import * as Bud from '@roots/bud-framework'
import {bind, fs, lodash, memo} from '@roots/bud-support'
import {isFunction} from 'lodash'
import type {Configuration} from 'webpack'

import {Item} from '../Item'
import * as items from '../items'
import {Loader} from '../Loader'
import * as loaders from '../loaders'
import {Rule} from '../Rule'
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
    this.app.hooks
      .action('event.build.before', async app => app.time(`build.make`))
      .hooks.action('event.build.after', async app =>
        app.timeEnd(`build.make`),
      )
      .hooks.action('event.build.after', this.writeFinalConfig)
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
        ['entry', true],
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
      ]
        .map(this.memoMap)
        .filter(Boolean)
        .map(this.memoMapValue),
    )

    await this.app.hooks.fire('event.build.after')

    return this.config
  }

  @bind
  public memoMap(...args: [value: (string | boolean)[]]) {
    const [[key, ...rest]] = args

    if (!this.app.hooks.has(`build.${key}`)) return false

    const type = rest.length && rest.shift() ? true : false
    const count = this.app.hooks.count(`build.${key}`)

    return [key, type, count]
  }

  @bind
  @memo()
  public async memoMapValue([propKey, isAsync, _count]: [
    keyof Configuration,
    boolean,
    number,
  ]) {
    const propValue =
      isAsync === true
        ? await this.app.hooks.filterAsync(`build.${propKey}` as any)
        : this.app.hooks.filter(`build.${propKey}` as any)

    if (isUndefined(propValue)) return

    Object.assign(this.config, {[propKey]: propValue})
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
   * Set a rule
   *
   * @param name - rule key
   * @param options - rule constructor properties
   * @returns the rule
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setRule(name: string, options?: Bud.Build.Rule.Options): Build {
    Object.assign(this.rules, {[name]: this.makeRule(options)})

    return this
  }
  /**
   * Make a rule
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
   * Set a rule
   *
   * @param name - rule key
   * @param options - rule constructor properties
   * @returns the rule
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
   * Make a rule
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
   * Set a rule
   *
   * @param name - rule key
   * @param options - rule constructor properties
   * @returns the rule
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
   * Make a rule
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
        `@storage/${this.config.name}/webpack.config.js`,
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
