import {CommandClass} from 'clipanion'

import {Command} from './base.command'

export class Contributors extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `contributors`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Aggregate contributor data`,
    examples: [[`update contributors`, `yarn @bud contributors`]],
  }

  public async execute() {
    try {
      await this.promise(
        `Updating contributors `,
        `Contributors updated`,
        `Failed to update contributors`,
        this.cli.run([
          `workspace`,
          `@repo/markdown-kit`,
          `exec`,
          `node`,
          `contributors/index.js`,
        ]),
      )
    } catch (e) {
      throw e
    }
  }
}
