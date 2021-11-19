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
 * Framework configuration builder class
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
   * {@inheritDoc @roots/bud-framework#Build.Interface.rules}
   *
   * @public
   */
  public rules: Rules

  /**
   * {@inheritDoc @roots/bud-framework#Build.Interface.items}
   *
   * @public
   */
  public items: Items

  /**
   * Make build
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
   * {@inheritDoc @roots/bud-framework#Build.Interface.bootstrap}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    await this.init()
  }

  @bind
  public async booted() {
    this.app.hooks.promise(
      'event.build.make.after',
      this.writeFinalConfig,
    )
  }

  /**
   * @public
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
   * @public
   */
  @bind
  public async init() {
    const reduce = (a, [k, v]) => ({...a, [k]: v()})

    Object.assign(this, {
      loaders: this.app
        .container(loaders)
        .getEntries()
        .reduce(reduce, this.loaders),
      rules: this.app
        .container(rules)
        .getEntries()
        .reduce(reduce, this.rules),
      items: this.app
        .container(items)
        .getEntries()
        .reduce(reduce, this.items),
    })

    await config(this.app)
  }
}
