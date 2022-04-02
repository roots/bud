import {bind, chalk} from '@roots/bud-support'
import {Command} from 'clipanion'
import webpackcli from 'webpack-cli'

import {factory} from '../../factory/index.js'
import {BaseCommand} from './base.js'

/**
 * @internal
 */
export class DoctorCommand extends BaseCommand {
  public webpack: {validate: (conf: any) => any}
  public webpackCLI: webpackcli

  public static paths = [[`doctor`]]

  public static usage = Command.Usage({
    category: `Doctor`,
    description: `Check compiled configuration against webpack`,
    examples: [
      [`Check compiled configuration against webpack`, `$0 doctor`],
    ],
  })

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
