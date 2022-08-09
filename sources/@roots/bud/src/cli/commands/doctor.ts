import type {Bud} from '@roots/bud-framework'
import chalk from 'chalk'
import {Command} from 'clipanion'
import {bind} from 'helpful-decorators'
import webpackcli from 'webpack-cli'

import {factory} from '../../factory/index.js'
import * as disk from '../config/disk.config.js'
import {BaseCommand} from './base.js'

/**
 * `bud doctor` command
 *
 * @public
 */
export class DoctorCommand extends BaseCommand {
  /**
   * Wepback interface
   *
   * @public
   */
  public webpack: {validate: (conf: any) => any}

  /**
   * Webpack CLI interface
   *
   * @public
   */
  public webpackCLI: webpackcli

  /**
   * Command paths
   *
   * @public
   */
  public static paths = [[`doctor`]]

  /**
   * Command usage
   *
   * @public
   */
  public static usage = Command.Usage({
    description: `Check compiled configuration against webpack`,
    examples: [
      [`Check compiled configuration against webpack`, `$0 doctor`],
    ],
  })

  /**
   * Command execute
   *
   * @public
   */
  public async runCommand() {
    this.webpackCLI = new webpackcli()
    this.webpack = await this.webpackCLI.loadWebpack()
    this.context.stdout.write(`\nChecking configuration...\n\n`)
    await this.checkConfiguration('production')
    await this.checkConfiguration('development')
    this.context.stdout.write(`\n\nChecking dependencies...\n\n`)
    await this.checkDependencies()

    process.exit()
  }

  @bind
  public async checkConfiguration(mode: 'production' | 'development') {
    let app: Bud

    try {
      app = await factory({
        args: {
          ci: true,
        },
        mode,
      })
    } catch (e) {
      app.error(`error constructing ${mode} app`)
    }

    try {
      await disk.config(app)
    } catch (error) {
      app.error(error)
    }

    try {
      await app.compiler.before()
    } catch (e) {}

    try {
      const conf = await app.compiler.before()

      if (!conf) {
        app.error('config not returned from bud compiler.')
      }

      if (!Array.isArray(conf)) {
        app.error('compiler did not return an array')
      }

      this.webpack.validate(conf)

      this.context.stdout.write(
        `${chalk.green(`✅ ${mode} configuration is valid\n`)}`,
      )
    } catch (error) {
      this.context.stderr.write(
        `${chalk.red(
          `❌ ${mode} configuration check returned an error\n`,
        )}`,
      )

      app.error(error)
    }
  }

  @bind public async checkDependencies() {
    let app: Bud

    try {
      app = await factory({
        args: {
          ci: true,
        },
      })
    } catch (e) {}

    Object.entries({
      ...(app.context.manifest.dependencies ?? {}),
      ...(app.context.manifest.devDependencies ?? {}),
    })
      .filter(([name]) => name.startsWith('@roots/'))
      .map(([k, v]) => {
        if (v !== app.context.application.version) {
          this.context.stderr.write(chalk.red(`version mismatch\n`))
          this.context.stderr.write(
            `${k} is not running on the same version as bud core.\n`,
          )
          this.context.stderr.write(
            `bud is on ${chalk.green(
              app.context.application.version,
            )} but ${k} is on ${chalk.yellow(v)}.\n\n`,
          )
        }
      })
  }
}
