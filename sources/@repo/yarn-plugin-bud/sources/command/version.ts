import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Version extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `version`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `bump version of public packages`,
    examples: [[`Bump packages to x.y.z`, `yarn @bud version x.y.z`]],
  }

  public version = Option.String()

  public async execute() {
    await this.cli
      .run([
        `workspaces`,
        `foreach`,
        `--no-private`,
        `package`,
        `set`,
        `version`,
        this.version,
      ])
      .then(this.throwIfError)
      .catch(this.catch)
  }
}
