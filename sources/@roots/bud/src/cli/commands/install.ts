import {chalk} from '@roots/bud-support'

import {BaseCommand} from './base.js'

/**
 * @public
 */
export class InstallCommand extends BaseCommand {
  public static paths = [[`install`], [`init`]]

  public async execute() {
    this.context.stdout.write(
      chalk.red(`bud install / bud init is deprecated\n`),
    )
    this.context.stdout.write(
      `This command was deprecated in 5.3.0. In the future this command will throw an error.\n`,
    )
  }
}
