import chalk from 'chalk'
import {Command} from 'clipanion'
import {bind} from 'helpful-decorators'
import webpackcli from 'webpack-cli'

import {factory} from '../../factory/index.js'
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
    category: `Doctor`,
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
  public async execute() {
    this.webpackCLI = new webpackcli()
    this.webpack = await this.webpackCLI.loadWebpack()
    this.app = await factory()

    await this.make()
    await this.checkConfiguration()
  }

  @bind
  public async checkConfiguration() {
    try {
      const conf = await this.app.compiler.before()

      if (!conf) {
        this.app.error('config not returned from bud compiler.')
      }

      if (!Array.isArray(conf)) {
        this.logger.info('The bud compiler should always return an array.')
        this.app.error('compiler did not return an array')
      }

      this.webpack.validate(conf)
      this.context.stdout.write(
        chalk.green(`Webpack configuration is valid\n`),
      )
    } catch (error) {
      this.context.stderr.write(
        chalk.red(`webpack configuration check returned an error\n`),
      )

      this.app.error(error)
    }

    this.app.close()
  }
}
