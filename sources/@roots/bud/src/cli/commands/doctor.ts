import {bind} from '@roots/bud-support'
import {Command} from 'clipanion'
import webpackcli from 'webpack-cli'

import {factory} from '../../factory/index.js'
import {BuildCommand} from './build.js'

/**
 * @internal
 */
export class DoctorCommand extends BuildCommand {
  public webpack: {validate: (conf: any) => any}
  public webpackCLI: webpackcli

  public static paths = [[`doctor`]]

  public static usage = Command.Usage({
    category: `Doctor`,
    description: `Doctor source assets`,
    details: `
      A longer description of the command with some \`markdown code\`.
      
      Multiple paragraphs are allowed. Clipanion will take care of both reindenting the content and wrapping the paragraphs as needed.
    `,
    examples: [
      [`Check bud compiled configuration against webpack`, `$0 doctor`],
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
      this.logger.success(`webpack configuration is valid`)
    } catch (error) {
      this.logger.error(error)
    }
  }
}
