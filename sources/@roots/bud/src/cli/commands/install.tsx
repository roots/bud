import chalk from 'chalk'

import BaseCommand from './base.js'

/**
 * `bud install` command
 *
 * @deprecated This command was deprecated in 5.3.0
 *
 * @public
 */
export default class InstallCommand extends BaseCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static paths = [[`install`], [`init`]]

  /**
   * Command execute
   *
   * @public
   */
  public async runCommand() {
    this.context.stdout.write(
      chalk.red(`bud install / bud init is deprecated\n`),
    )

    this.context.stdout.write(
      `This command was deprecated in 5.3.0. In the future this command will throw an error.\n`,
    )
  }
}
