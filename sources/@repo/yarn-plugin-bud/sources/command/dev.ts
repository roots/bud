import {CommandClass} from 'clipanion'

import {Command} from './base.command'

/**
 * Dev command
 */
export class Dev extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `dev`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `develop project code`,
    examples: [
      [`run tsc, docusaurus & vitest in watch mode`, `yarn @bud dev`],
    ],
  }

  public async execute() {
    await this.cli.run([`@bud`, `build`])
    await this.cli.run([`@bud`, `docs`, `build`])

    this.promised.push(
      this.cli.run([`@bud`, `tsc`, `--watch`]),
      this.cli.run([`@bud`, `test`, `unit`]),
      this.cli.run([`@bud`, `docs`, `dev`]),
    )

    await Promise.all(this.promised)
  }
}
