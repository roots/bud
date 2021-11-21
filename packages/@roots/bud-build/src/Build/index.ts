import {
  Build as Contract,
  Items,
  Loaders,
  Rules,
} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, chalk, fs} from '@roots/bud-support'
import type * as Webpack from 'webpack'

import {config} from './config'
import items from './items'
import loaders from './loaders'
import * as rules from './rules'

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
  public config: Webpack.Configuration

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
   * Make webpack configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async make(): Promise<Webpack.Configuration> {
    await this.app.hooks.promised(
      'event.build.make.before',
      this.app,
    )

    const build = await this.app.hooks.promised('build')

    this.config = Object.entries(build).reduce(
      (all: Partial<Webpack.Configuration>, [key, value]) => {
        if (typeof value === 'undefined') {
          this.log(`warn`, {
            message: `build.make: excluding ${key}`,
            suffix: `value is undefined`,
          })
          return all
        }

        this.app.dump(value, {
          prefix: `${chalk.bgBlue(this.app.name)} config.${key}`,
          maxDepth: 2,
        })
        return {...all, [key]: value}
      },
      {},
    )

    await this.app.hooks.promised('event.build.make.after')

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
    const reducer = (a: Rules | Items | Loaders, [k, v]) => ({
      ...a,
      [k]: v(),
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
   * Service booted event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async booted() {
    this.app.hooks.on(
      'event.build.make.after',
      this.writeFinalConfig,
    )
  }

  /**
   * Write final configuration to storage directory
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async writeFinalConfig() {
    try {
      const filePath = this.app.path(
        'storage',
        this.config.name,
        'webpack.config.js',
      )

      this.log('info', {
        message: `writing webpack dump to disk`,
        suffix: filePath,
      })

      await ensureFile(filePath)

      await writeFile(
        filePath,
        `module.exports = (${JSON.stringify(
          this.config,
          null,
          2,
        )})`,
      )
    } catch (error) {
      this.log('error', `failed to write webpack.config.json`)
      this.log(`error`, error)
    }
  }

  /**
   * Initialize the build rules, loaders, items
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async init() {}
}
