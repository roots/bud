import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Docusaurus extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `docusaurus`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run docusaurus`,
    examples: [[`docusaurus usage info`, `yarn @bud docusaurus --help`]],
  }

  public passthrough = Option.Proxy({name: `docusaurus options`})

  public async execute() {
    return await this.cli
      .run([
        `workspace`,
        `@repo/docs`,
        `docusaurus`,
        ...(this.passthrough ?? []),
      ])
      .then(this.throwIfError)
      .catch(this.catch)
  }
}
