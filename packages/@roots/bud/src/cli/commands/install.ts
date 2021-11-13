import {flags} from '@oclif/command'
import chalk from 'chalk'
import {bind} from 'helpful-decorators'

import {Command} from '../Command'

export default class Install extends Command {
  /**
   * @public
   */
  public static id = 'install'

  /**
   * @public
   */
  public static title = 'install'

  /**
   * @public
   */
  public static description = 'install peer dependencies'

  /**
   * @public
   */
  public static examples = ['$ bud install']

  /**
   * @public
   */
  public static aliases = ['init']

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

  /**
   * @public
   */
  public async run() {
    await this.prime(Install)
    await this.app.project.refreshProfile()
    this.logger.enable()

    if (!this.hasUnmet) {
      return await this.allInstalled()
    }

    return await this.installUnmet()
  }

  /**
   * @public
   */
  public get hasUnmet(): boolean {
    return this.app.project.get('unmet').length
  }

  /**
   * @public
   */
  @bind
  public async installUnmet() {
    try {
      await this.app.dependencies.install(
        this.app.project.get('unmet'),
      )
      this.allInstalled()
    } catch (error) {
      this.logger.error(error)
      this.exit(1)
    }
  }

  /**
   * @public
   */
  @bind
  public async allInstalled() {
    this.logger.success(
      chalk.green`${this.app.name} is up to date`,
    )
    this.exit(0)
  }
}
