import {CommandClass} from 'clipanion'

import {Command} from './base.command'

export class Clean extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `clean`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `clean project artifacts`,
    examples: [[`clean project artifacts`, `yarn @bud clean`]],
  }

  public async execute() {
    await this.promise(
      `Removing found files`,
      `Removed found files`,
      `No files to remove`,
      this.cli.run([`exec`, `git`, `clean`, `-fxd`]),
    )
  }
}
