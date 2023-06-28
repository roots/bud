import {CommandClass} from 'clipanion'

import {Command} from './base.command'

export class DocsDev extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `docs`, `dev`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `develop docs`,
    examples: [[`develop docs`, `yarn @bud docs dev`]],
  }

  public async execute() {
    await this.cli.run([`@bud`, `docs`, `build`])
    await this.cli.run([`@bud`, `docusaurus`, `start`])
  }
}
