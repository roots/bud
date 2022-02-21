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
    this.app = await factory({config: this.config()})

    await this.make()
    await this.checkConfiguration()
  }

  @bind
  public async checkConfiguration() {
    try {
      const conf = await this.app.compiler.before()

      if (!conf) {
        throw new Error('config not returned from bud compiler.')
      }

      if (!Array.isArray(conf)) {
        this.logger.info('the bud compiler should always return an array.')
        throw new Error('compiler did not return an array')
      }

      this.webpack.validate(conf)
      process.stdout.write(chalk.green(`webpack configuration is valid\n`))
    } catch (error) {
      process.stderr.write(
        chalk.red(`webpack configuration check returned an error\n`),
      )
      process.stderr.write(error)
      process.exit(1)
    }
  }
}
