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
  public async run() {
    await this.prime(Init)

    !this.app.project.get('unmet').length &&
      this.logger.info(
        chalk.green`${this.app.project.get(
          'name',
        )} is up to date`,
      )

    this.app.dependencies.install(this.app.project.get('unmet'))

    process.exit()
  }
}
