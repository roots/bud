import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

/**
 *
 */
export class ContainerBash extends Command {
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
   * Command main
   *
   * @internal
   */
  public async execute() {
    await this.$(`docker compose run bud bash`)
  }
}
