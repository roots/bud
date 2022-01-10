/* eslint-disable no-console */
import * as oclif from '@oclif/core'
import {bind, chalk, Signale} from '@roots/bud-support'
import {join} from 'path'
import Webpack from 'webpack'
import webpackcli from 'webpack-cli'

import {Command} from '../Command/index.js'

/**
 * @internal
 */
export default class Doctor extends Command {
  /**
   * @internal
   */
  public static id = 'doctor'

  /**
   * @internal
   */
  public static description = 'diagnose issues'

  /**
   * @internal
   */
  public static examples = [`$ bud doctor`]

  /**
   * @internal
   */
  public static flags = {
    ...Command.flags,
    ['log']: oclif.Flags.boolean({
      default: false,
      hidden: true,
    }),

    ['log.papertrail']: oclif.Flags.boolean({
      default: false,
      hidden: true,
    }),

    ['dashboard']: oclif.Flags.boolean({
      default: false,
      hidden: true,
    }),
  }

  /**
   * @internal
   */
  private failures = []

  /**
   * @internal
   */
  public checks: Array<Promise<any>> = []

  /**
   * @internal
   */
  public conf: Array<Webpack.Configuration>

  /**
   * @internal
   */
  public async run(): Promise<void> {
    await this.prime(Doctor)

    this.logger = new Signale({scope: 'doctor'})

    await this.main()
  }

  /**
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async main() {
    this.checks.push(
      this.checkDependencies(
        new Signale({scope: 'dependencies', interactive: false}),
      ),
      this.checkPaths(
        new Signale({scope: 'resolutions', interactive: false}),
      ),
      this.checkConfiguration(
        new Signale({
          scope: 'configuration',
          interactive: false,
        }),
      ),
    )

    await Promise.all(this.checks)

    !this.hasErrors()
      ? console.log(chalk.green`\nall checks are O.K.`)
      : console.log(chalk.red`\n${this.failures.length} checks failed`)

    await this.app.project.buildProfile()
    await this.app.project.writeProfile()
  }

  /**
   * @returns true if there are errors
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public hasErrors(): boolean {
    return this.failures.length > 0
  }

  /**
   * @param logger - logger instance
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async checkDependencies(logger: Signale) {
    if (!this.app.project.getValues('unmet').length) {
      return logger.success(`all peer requirements are met`)
    }

    this.app.project.get('unmet').map(({name, version}) => {
      this.failures.push(`missing ${name}@${version}`)
      logger.error(chalk.red`missing ${name}@${version}`)
    })

    logger.warn(
      chalk.yellow('Run `bud init` to install missing dependencies'),
    )
  }

  /**
   * @param logger - logger instance
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async checkPaths(logger: Signale) {
    const paths = await this.app.project.get('resolve')

    try {
      await Promise.all(
        paths.map(async path => {
          try {
            await import(join(path, 'package.json'))
          } catch (error) {
            logger.error(chalk.red`${path} ${chalk.red`not resolved`}`)
            this.failures.push(`${path} ${chalk.red`not resolved`}`)
          }
        }),
      )

      logger.success(`all project paths resolvable`)
    } catch (error) {}
  }

  /**
   * @param logger - logger instance
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async checkConfiguration(logger: Signale) {
    try {
      /* Instantiate webpack-cli */
      const cli = new webpackcli()
      const webpack = await cli.loadWebpack()

      /* Build webpack configuration */
      await this.build()
      const conf = await this.app.compiler.before()

      /* Validate */
      webpack.validate(conf)
      logger.success(`webpack configuration is valid`)
    } catch (error) {
      this.failures.push(`webpack configuration is invalid`)
      logger.error(error)
    }
  }
}
