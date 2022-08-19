import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class RunCommand extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud run`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass[`paths`] = [[`@bud`, `run`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass[`usage`] = {
    category: `@bud`,
    description: `run a series of bud commands`,
    examples: [[``, `yarn @bud run`]],
  }

  public tasks = Option.Array(`--`, {
    description: `task to run`,
  })

  /**
   * @public
   */
  public async execute() {
    await this.tasks.reduce(async (promised, task) => {
      await promised
      await this.$(`yarn @bud ${task}`)
      return Promise.resolve()
    }, Promise.resolve())
  }
}
