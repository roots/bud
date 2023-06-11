import {CommandClass} from 'clipanion'

import {Command} from './base.command'

/**
 * Plugin rebuild command
 */
export class Plugin extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `plugin`, `rebuild`],
  ]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    examples: [[`rebuild @bud yarn plugin`, `yarn @bud plugin rebuild`]],
  }

  public async execute() {
    await this.cli.run([`workspace`, `@repo/yarn-plugin-bud`, `build`])
  }
}
