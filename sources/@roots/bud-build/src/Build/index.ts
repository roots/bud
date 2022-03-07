import {
  Build as Contract,
  Items,
  Loaders,
  Rules,
  Service,
} from '@roots/bud-framework'
import {bind, fs, lodash, memo} from '@roots/bud-support'
import type {Configuration} from 'webpack'

import {Rule} from '../Rule/index'
import * as config from './config/index'
import items from './items'
import loaders from './loaders'
import * as rules from './rules'

const {isNull, isUndefined} = lodash
const {ensureFile, writeFile} = fs

/**
 * Webpack configuration builder class
 *
 * @public
 */
export class Build extends Service implements Contract.Interface {
  /**
   * @public
   */
  public config: Partial<Configuration>

  /**
   * Registered loaders
   *
   * @public
   */
  public loaders: Loaders

  /**
   * Registered rules
   *
   * @public
   */
  public rules: Rules

  /**
   * Registered items
   *
   * @public
   */
  public items: Items

  /**
   * Service booted event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async registered() {
    this.app.hooks.action('event.build.before', async app =>
      app.time(`build.make`),
    )
    this.app.hooks.action('event.build.after', async app =>
      app.timeEnd(`build.make`),
    )
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

    this.config = await [
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
      .reduce(this.memoReducer, Promise.resolve({}))

    await this.app.hooks.fire('event.build.after')

    return this.config
  }

  /**
   *
   *
   * @param args
   * @returns
   */
  @bind
  public memoMap(...args: [value: (string | boolean)[]]) {
    const [[key, ...rest]] = args

    if (!this.app.hooks.has(`build.${key}`)) return false

    const type = rest.length && rest.shift() ? 'async' : 'sync'
    const count = this.app.hooks.count(`build.${key}`)

    return [key, type, count]
  }

  @bind
  @memo()
  public async memoReducer(
    promised: Promise<Configuration>,
    [propKey, type, _count]: [
      keyof Configuration,
      'async' | 'sync',
      number,
    ],
  ) {
    const config = await promised

    const propValue =
      type == 'async'
        ? await this.app.hooks.filterAsync(`build.${propKey}` as any)
        : this.app.hooks.filter(`build.${propKey}` as any)

    return isUndefined(propValue) || isNull(propValue)
      ? config
      : {...config, [propKey]: propValue}
  }

  /**
   * Service register event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    const reducer = (a: Rules | Items | Loaders, [k, v]) => ({
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
   * @param constructorProperties - rule constructor properties
   * @returns the rule
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setRule(name: string, constructorProperties?): Rule {
    Object.assign(this.rules, {
      [name]: this.makeRule(constructorProperties),
    })

    return this.rules[name]
  }

  /**
   * Make a rule
   *
   * @param constructorProperties - rule constructor properties
   * @returns the rule
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public makeRule(constructorProperties?): Rule {
    return new Rule(this.app, constructorProperties)
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
        'storage',
        this.config.name,
        'webpack.config.js',
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
