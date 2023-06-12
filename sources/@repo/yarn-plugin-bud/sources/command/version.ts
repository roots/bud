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
    try {
      await this.promise(
        `Versioning packages to ${this.version}`,
        `Packages versioned`,
        `Failed to version packages`,
        this.cli.run([
          `workspaces`,
          `foreach`,
          `--no-private`,
          `package`,
          `set`,
          `version`,
          this.version,
        ]),
      )
    } catch (e) {
      throw e
    }
  }
}
