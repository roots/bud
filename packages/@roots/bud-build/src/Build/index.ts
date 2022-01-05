import {
  Build as Contract,
  Items,
  Loaders,
  Rules,
} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, fs, lodash, prettyFormat} from '@roots/bud-support'
import type * as Webpack from 'webpack'
import {Configuration} from 'webpack'

import {Rule} from '../Rule'
import {config} from './config'
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
export class Build
  extends Service
  implements Contract.Interface
{
  /**
   * @internal
   */
  public config: Partial<Configuration>

  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.loaders}
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
    this.app.hooks.on<'event.build.make.after'>(
      'event.build.make.after',
      this.writeFinalConfig,
    )
  }

  /**
   * Make webpack configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async make(): Promise<Webpack.Configuration> {
    try {
      await this.app.hooks.filterAsync<'event.build.make.before'>(
        'event.build.make.before',
        this.app,
      )

      const build = await this.app.hooks.filterAsync<'build'>(
        'build',
      )

      if (!build || isUndefined(build) || isNull(build)) {
        throw new Error('bad build')
      }

      const processed = Object.entries(build).reduce(
        (all: Configuration, [key, value]) => {
          if (!value || isUndefined(value) || isNull(value)) {
            this.log(`warn`, {
              message: `build.make: excluding ${key}`,
              suffix: `value is undefined`,
            })

            return all
          }

          this.log('info', key, prettyFormat(value))

          return {...all, [key]: value}
        },
        {},
      )

      if (!processed.entry) processed.entry = {}

      this.config = processed
        ? await this.app.hooks.filterAsync<'event.build.override'>(
            'event.build.override',
            processed,
          )
        : {}

      await this.app.hooks.filterAsync<'event.build.make.after'>(
        'event.build.make.after',
        async () => {},
      )

      return this.config
    } catch (error) {
      this.log('error', error)
      this.app.timeEnd('bud')
      this.app.debug({
        config: this.config,
      })
    }
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

    await config(this.app)
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

      this.log('log', {
        message: `writing webpack dump to disk`,
        suffix: filePath,
      })

      await ensureFile(filePath)

      await writeFile(
        filePath,
        `module.exports = (${prettyFormat(this.config)})`,
      )
    } catch (error) {
      this.log('error', `failed to write webpack.config.json`)
      this.log(`error`, error)
    }
  }
}
