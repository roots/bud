import {CommandClass} from 'clipanion'

import {Command} from './base.command'

/**
 * Plugin rebuild command
 */
export class Plugin extends Command {
  /**
   * Command name
   */
  public static label = `@bud plugin rebuild`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `plugin`, `rebuild`],
  ]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: ``,
    examples: [[`rebuild @bud yarn plugin`, `yarn @bud plugin rebuild`]],
  }

  public async execute() {
    await this.$([`yarn`, [`workspace`, `@repo/yarn-plugin-bud`, `build`]])
  }
}
