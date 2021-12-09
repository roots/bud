import {CommandClass} from 'clipanion'

import {Command} from './base.command'

export class Make extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `make`]]
  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `make project files same as ci`,
    examples: [
      [`install/build repo packages`, `yarn @bud make`],
    ],
  }

  public async execute() {
    await this.$(`yarn install --immutable`)

    await this.$(`yarn @bud build`)

    await this.$(`yarn @bud lint`)

    await this.$(`yarn @bud test`)
  }
}
