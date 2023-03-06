import {CommandClass} from 'clipanion'

import {Command} from './base.command'

/**
 * @bud contributors command
 */
export class Contributors extends Command {
  /* Command name */
  public static label = `contributors`
  /* Command paths */
  public static paths: CommandClass['paths'] = [[`@bud`, `contributors`], [`contributors`]]
  /* Command usage */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `update contributors`,
    examples: [[`update contributors`, `yarn contributors`]],
  }
  /* Command execute */
  public async execute() {
    await this.$(`yarn workspace @repo/markdown-kit exec node ./contributors/index.js`)
  }
}
