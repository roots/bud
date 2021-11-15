/* eslint-disable no-console */
import {flags} from '@oclif/command'
import {Webpack} from '@roots/bud-server/src/util/inject-client.interface'
import chalk from 'chalk'
import {bind} from 'helpful-decorators'
import {join} from 'path'
import {Signale} from 'signale'
import webpackcli from 'webpack-cli'

import {Command} from '../Command'

/**
 * @public
 */
export default class Doctor extends Command {
  /**
   * @public
   */
  public static id = 'doctor'

  /**
   * @public
   */
  public static title = 'doctor'

  /**
   * @public
   */
  public static description = 'diagnose issues'

  /**
   * @public
   */
  public static examples = [`$ bud doctor`]

  /**
   * @public
   */
  public static flags = {
    ...Command.flags,
    ['log']: flags.boolean({
      default: false,
      hidden: true,
    }),
    ['log.papertrail']: flags.boolean({
      default: false,
      hidden: true,
    }),
    ['dashboard']: flags.boolean({
      default: false,
      hidden: true,
    }),
    ['flush']: flags.boolean({
      default: true,
      hidden: true,
    }),
  }

  private failures = []

  public checks: Array<Promise<any>> = []

  public conf: Array<Webpack.Configuration>

  /**
   * @public
   */
  public async run(): Promise<void> {
    await this.prime(Doctor)
    await this.app.project.refreshProfile()

    this.logger = new Signale({scope: 'doctor'})

    await this.main()
  }

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
      : console.log(
          chalk.red`\n${this.failures.length} checks failed`,
        )

    await this.app.project.refreshProfile()
  }

  @bind
  public hasErrors() {
    return this.failures.length > 0
  }

  @bind
  public async checkDependencies(logger: Signale) {
    if (!this.app.project.getValues('unmet').length) {
      return logger.success(`all peer requirements are met`)
    }

    this.app.project.get('unmet').map(({name, version}) => {
      this.failures.push(`missing ${name}@${version}`)
      logger.error(chalk.red`missing ${name}@${version}`)
    })

    return logger.warn(
      chalk.yellow(
        'Run `bud init` to install missing dependencies',
      ),
    )
  }

  @bind
  public async checkPaths(logger: Signale) {
    const paths = await this.app.project.get('resolve')

    try {
      await Promise.all(
        paths.map(async path => {
          try {
            await import(join(path, 'package.json'))
          } catch (error) {
            logger.error(
              chalk.red`${path} ${chalk.red`not resolved`}`,
            )
            this.failures.push(
              `${path} ${chalk.red`not resolved`}`,
            )
          }
        }),
      )

      logger.success(`all project paths resolvable`)
    } catch (error) {}
  }

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
