import chalk from 'chalk'

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
  public async run(): Promise<void> {
    await this.prime(Doctor)

    this.logger.info(`validating project`)

    if (!this.app.project.get('unmet').length)
      this.logger.success('All checks are O.K.')
    else {
      this.app.project
        .get('unmet')
        .map(({name, version}) =>
          this.logger.error(
            chalk.red`missing `.concat(`${name}@${version}`),
          ),
        )

      this.logger.warn(
        chalk.yellow`Run \`bud init\` to install missing dependencies`,
      )
    }

    return process.exit()
  }
}
