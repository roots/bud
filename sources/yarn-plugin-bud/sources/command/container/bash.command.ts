import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

/**
 * Container bash command
 *
 * @internal
 */
export class ContainerBash extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = '@bud bash'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `bash`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `open a bash shell`,
    details: `equivalent to \`docker compose run bud bash\``,
    examples: [[`open a bash shell`, `yarn @bud bash`]],
  }

  /**
   * Command execute
   *
   * @internal
   */
  public async execute() {
    await this.$(`docker compose run bud bash`)
  }
}
