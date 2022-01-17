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
  public name = '@bud container'

  /**
   * Boolean indicating whether the command must be run in a container context
   *
   * @remarks
   * This is mainly used to prevent accidental publishing of packages
   * in the host context.
   *
   * @internal
   * @decorator `@bind`
   */
  public requiresContainer: boolean = false

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
        `yarn @bud :`,
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
      this.withPassthrough(
        `docker compose run --rm bud yarn @bud`,
      ),
    )
  }
}
