import {CommandClass, Option} from 'clipanion'
import {Command} from './base.command'

/**
 * Publish command
 *
 * @internal
 */
export class Publish extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public name = 'publish'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [
    [`@bud`, `publish`],
  ]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `publish a package`,
    examples: [
      [
        `yarn @bud publish --tag latest`,
        `Publish packages with the 'latest' tag`,
      ],
    ],
  }

  /**
   * Requires container
   *
   * @remarks
   * Will fail if process.env.BUD_ENV does not equal 'container'
   *
   * @internal
   */
  public requiresContainer = true

  /**
   * --tag flag
   *
   * @internal
   */
  public tag = Option.String(`-t,--tag`, null, {
    description: `tag`,
  })

  /**
   * execute command
   *
   * @remarks
   * You must be in the roots staff channel to see this link. It is
   * just a broader overview of the steps.
   *
   * @internal
   */
  public async execute() {
    if (
      !this.tag ||
      (this.tag !== 'latest' && this.tag !== 'next')
    ) {
      this.errorHandler(`Invalid tag: ${this.tag}`)
    }

    await this.$(
      `yarn workspaces foreach --no-private npm publish --access public --tag ${this.tag}`,
    )
  }
}
