import {CommandClass} from 'clipanion'

import {Command} from './base.command'

export class Browserslist extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `browserslist`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `update browesrslist`,
    examples: [[`update browesrslist`, `yarn @bud browserslist`]],
  }

  public async execute() {
    await this.cli.run([
      `dlx`,
      `update-browserslist-db@latest`,
    ])
  }
}

