import {CommandClass} from 'clipanion'

import {Command} from './base.command.js'

export class Clean extends Command {
  public static override paths: CommandClass['paths'] = [[`@bud`, `clean`]]

  public static override usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `clean project artifacts`,
    examples: [[`clean project artifacts`, `yarn @bud clean`]],
  }

  public async execute() {
    await this.cli.run([`exec`, `git`, `clean`, `-fxd`])
  }
}
