import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Docs command class
 *
 * @internal
 */
export class DocsDev extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = `@bud docs dev`

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `docs`, `dev`]]

  /**
   * Command usage
   *
   * @internal
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `develop docs`,
    examples: [[`develop docs`, `yarn @bud docs dev`]],
  }

  /**
   * Execute command
   *
   * @internal
   */
  public async execute() {
    await this.$(`yarn workspace @repo/docs docusaurus start`)
  }
}
