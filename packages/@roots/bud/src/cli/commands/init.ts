import {flags} from '@oclif/command'
import chalk from 'chalk'

import {Command} from '../Command'

export default class Init extends Command {
  /**
   * @public
   */
  public static id = 'init'

  /**
   * @public
   */
  public static title = 'init'

  /**
   * @public
   */
  public static description = 'install peer dependencies'

  /**
   * @public
   */
  public static examples = [`$ bud init`]

  /**
   * @public
   */
  public static flags = {
    ...Command.flags,
    ['log']: flags.boolean({
      default: true,
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

  /**
   * @public
   */
  public async run() {
    await this.prime(Init)
    await this.app.project.refreshProfile()

    this.app.logger.instance.enable()

    !this.app.project.get('unmet').length
      ? this.app.success(
          chalk.green`${this.app.name} is up to date`,
        )
      : await this.app.dependencies.install(
          this.app.project.get('unmet'),
        )
  }
}
