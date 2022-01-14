import {CommandClass, Option} from 'clipanion'

import {Command} from '../base.command'

/**
 * Container up
 */
export class ContainerUp extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = '@bud up'

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
  public static paths: CommandClass['paths'] = [[`@bud`, `up`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `start the container`,
    details: `equivalent to \`docker compose up [...]\``,
    examples: [
      [`start the container`, `yarn @bud up`],
      [`start the container detached`, `yarn @bud up -d`],
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
    await this.$(
      this.withPassthrough(`docker compose up --no-log-prefix`),
    )
  }
}
