import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

/**
 * Clean command
 *
 * @internal
 */
export class Clean extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'clean'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `clean`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `clean project artifacts`,
    examples: [
      [`delete all untracked files`, `yarn @bud clean --dfx`],
    ],
  }

  /**
   * --all flag
   *
   * @internal
   */
  public all = Option.Boolean(`-a,--all`, false, {
    description: `cleans all untracked files`,
  })

  /**
   * Command execution
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn cache clean --all`)
    if (this.all) await this.$(`git clean -fxd`)
  }
}
