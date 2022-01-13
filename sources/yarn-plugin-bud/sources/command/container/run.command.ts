import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

export class ContainerRun extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = '@bud $'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `$`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run a command in the container`,
    details: `equivalent to \`docker compose run bud [...]\``,

    examples: [
      [
        `run bash command in docker container`,
        `yarn @bud $ echo "hello world"`,
      ],
    ],
  }

  /**
   * Passthrough args
   *
   * @internal
   */
  public passthrough = Option.Proxy({
    name: `docker compose up options`,
  })

  /**
   * Command execute
   *
   * @internal
   */
  public async execute() {
    await this.$(this.withPassthrough(`docker compose run bud`))
  }
}
