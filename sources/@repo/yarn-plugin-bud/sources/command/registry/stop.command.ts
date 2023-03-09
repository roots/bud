/* eslint-disable no-console */
import {execute} from '@yarnpkg/shell'
import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * bud registry stop command class
 */
export class RegistryStop extends Command {
  /**
   * Command name
   */
  public static label = `@bud registry stop`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `registry`, `stop`],
  ]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `stop verdaccio registry`,
    examples: [[`stop verdaccio server`, `yarn @bud registry stop`]],
  }

  /**
   * Execute command
   */
  public async execute() {
    try {
      await this.cli.run([`@bud`, `pm2`, `stop`, `verdaccio`])

      await this.cli.run([`@bud`, `pm2`, `delete`, `verdaccio`])
    } catch (e) {}
  }
}
