import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

/**
 * Container @bud command
 *
 * @internal
 */
export class ContainerBud extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = '@bud :'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `:`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run a @bud command inside the container.`,
    details: `equivalent to \`docker compose run bud yarn @bud [...]\``,
    examples: [
      [
        `run \`yarn @bud make\` within the container`,
        `yarn @bud : make`,
      ],
    ],
  }

  /**
   * Passthrough args
   *
   * @internal
   */
  public passthrough = Option.Proxy({
    name: `@bud options`,
  })

  /**
   * Command execute
   *
   * @internal
   */
  public async execute() {
    await this.$(
      this.withPassthrough(`docker compose run bud yarn @bud`),
    )
  }
}
