import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

/**
 * Container down command
 *
 * @internal
 */
export class ContainerDown extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = '@bud down'

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
  public static paths: CommandClass['paths'] = [[`@bud`, `down`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `stop the container`,
    details: `equivalent to \`docker compose down [...]\``,
    examples: [[`stop the container`, `yarn @bud down`]],
  }

  /**
   * Passthrough args
   *
   * @internal
   */
  public passthrough = Option.Proxy({
    name: `docker compose down options`,
  })

  /**
   * Command execute
   *
   * @internal
   */
  public async execute() {
    await this.$(this.withPassthrough(`docker compose down`))
  }
}
