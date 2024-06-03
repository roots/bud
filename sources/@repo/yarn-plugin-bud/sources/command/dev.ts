import {CommandClass} from 'clipanion'

import {Command} from './base.command.js'

/**
 * Dev command
 */
export class Dev extends Command {
  public static override paths: CommandClass['paths'] = [[`@bud`, `dev`]]

  public static override usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `develop project code`,
    examples: [
      [`run tsc, docusaurus & vitest in watch mode`, `yarn @bud dev`],
    ],
  }

  public override async catch(error: Error) {
    process.stderr.write(
      `\n\n----------------\n\nError: ${error.message}\n\n----------------\n\n`,
    )
  }

  public async execute() {
    await Promise.all([
      this.cli.run([`@bud`, `build`]).catch(this.catch),
      this.cli.run([`@bud`, `docs`, `build`]).catch(this.catch),
    ])

    await Promise.all([
      this.cli.run([`@bud`, `tsc`, `--watch`]).catch(this.catch),
      this.cli
        .run([`@bud`, `test`, `unit`, `--watch`, `--ui`])
        .catch(this.catch),
      this.cli.run([`@bud`, `docs`, `dev`]).catch(this.catch),
    ])
  }
}
