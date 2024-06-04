import {CommandClass} from 'clipanion'

import {Command} from './base.command.js'

export class DocsDev extends Command {
  public static override paths: CommandClass['paths'] = [
    [`@bud`, `docs`, `dev`],
  ]

  public static override usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `develop docs`,
    examples: [[`develop docs`, `yarn @bud docs dev`]],
  }

  public async execute() {
    await this.cli.run([`@bud`, `docs`, `build`])
    await this.cli.run([`@bud`, `docusaurus`, `start`, `--port=3015`])
  }
}
