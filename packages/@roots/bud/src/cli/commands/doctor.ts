/* eslint-disable no-console */
import {flags} from '@oclif/command'
import chalk from 'chalk'
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

  public static flags = {
    ...Command.flags,
    ['log']: flags.boolean({
      default: false,
      hidden: true,
    }),
    ['log.papertrail']: flags.boolean({
      default: true,
      hidden: true,
    }),
    ['dashboard']: flags.boolean({
      default: false,
      hidden: true,
    }),
  }

  private failures = []

  /**
   * @public
   */
  public async run(): Promise<void> {
    await this.prime(Doctor)
    this.logger.enable()

    this.logger.info(chalk.underline`validating project`)
    console.log()

    await this.checkDependencies()
    await this.checkPaths()
    await this.checkConfiguration()

    console.log()
    const errored = this.failures.length
    !errored
      ? this.logger.success(
          chalk.green.bold`all checks are O.K.`,
        )
      : this.logger.error(
          chalk.red.bold`${errored} checks failed`,
        )
  }

  public async checkDependencies() {
    this.logger.pending(
      chalk.underline`evaluating peer requirements`,
    )
    this.app.project.getValues('peers').map(peer => {
      this.logger.info({
        message: `${peer.name} ${chalk.gray(
          `@${peer.version}`,
        )}`,
      })
    })

    if (!this.app.project.get('unmet').length) {
      this.logger.success(
        chalk.green.bold(
          'dependencies meet the requirements listed by installed extensions',
        ),
      )

      return
    }

    this.app.project.get('unmet').map(({name, version}) => {
      const msg = chalk.red`missing `.concat(
        `${name}@${version}`,
      )
      this.failures.push(msg)
      this.logger.error(msg)
    })

    this.logger.warn(
      chalk.yellow`Run \`bud init\` to install missing dependencies`,
    )
  }

  public async checkPaths() {
    console.log()
    this.logger.pending(chalk.underline`evaluating paths`)

    const paths = await this.app.project.get('resolve')

    if (paths.length) {
      try {
        await Promise.all(
          paths.map(async path => {
            try {
              require.resolve(path)
              this.logger.success(
                `${path} ${chalk.green`resolved`}`,
              )
            } catch (error) {
              this.logger.error(
                chalk.red`error resolving ${path}`,
              )
              this.failures.push(
                chalk.red(`${path} is not resolvable by node`),
              )
            }
          }),
        )

        this.logger.success(
          chalk.green.bold(`all project paths resolvable`),
        )
      } catch (error) {
        this.logger.error(chalk.red`error resolving paths`)
        this.failures.push(chalk.red`error resolving paths`)
      }
    }
  }

  public async checkConfiguration() {
    console.log()
    this.logger.pending(
      chalk.underline`validating webpack options`,
    )
    try {
      const cli = new webpackcli()
      const webpack = await cli.loadWebpack()
      const conf = await this.app.compiler.before()

      webpack.validate(conf)
      this.logger.success(
        chalk.green.bold`webpack configuration is valid`,
      )
    } catch (error) {
      this.logger.error(error)
    }
  }
}
