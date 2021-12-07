import {CommandClass} from 'clipanion'

import {Command} from '../Command'

export class MakeCommand extends Command {
  public static paths: CommandClass['paths'] = [[`repo`, `make`]]
  public static usage: CommandClass['usage'] = {
    category: `repo`,
    description: `make project files same as ci`,
    examples: [
      [`install/build repo packages`, `yarn repo make`],
    ],
  }

  public async execute() {
    await this.$(`yarn install --immutable`)

    await this.$(`yarn repo build`)

    await this.$(`yarn repo lint`)

    await this.$(`yarn repo test`)
  }
}
