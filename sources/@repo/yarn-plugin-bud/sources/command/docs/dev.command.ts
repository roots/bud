import {CommandClass} from 'clipanion'

import {Command} from '../base.command'

/**
 * Docs command class
 */
export class DocsDev extends Command {
  /**
   * Command name
   */
  public static label = `@bud docs dev`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `docs`, `dev`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `develop docs`,
    examples: [[`develop docs`, `yarn @bud docs dev`]],
  }

  /**
   * Execute command
   */
  public async execute() {
    await this.cli.run([`workspace`, `@repo/docs`, `docusaurus`, `start`])
  }
}
