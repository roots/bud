import {CommandClass} from 'clipanion'

import {Command} from './base.command'

/**
 * Dev command
 */
export class Dev extends Command {
  /**
   * Command name
   */
  public static label = `@bud dev`

  /**
   * Command paths
   */
  public static paths: CommandClass['paths'] = [[`@bud`, `dev`]]

  /**
   * Command usage
   */
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `develop project code`,
    examples: [
      [`run tsc, docusaurus & vitest in watch mode`, `yarn @bud dev`],
    ],
  }

  /**
   * @public
   */
  public async execute() {
    await this.cli.run([`@bud`, `tsc`, `--force`])

    try {
      await Promise.all([
        this.cli.run(
          [`@bud`, `tsc`, `--watch`],
        ),
        this.cli.run(
          [`@bud`, `test`, `unit`],
        ),
        this.cli.run(
          [`@bud`, `docs`, `dev`],
        ),
      ])
    } catch (e) {
      this.context.stderr.write(e)
    }
  }
}
