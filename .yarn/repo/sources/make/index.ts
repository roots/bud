import {Command} from '../Command'
import {CommandClass} from 'clipanion'

export class MakeCommand extends Command {
  static paths: CommandClass['paths'] = [[`repo`, `make`]]
  static usage: CommandClass['usage'] = {
    category: `repo`,
    description: `make project files same as ci`,
    examples: [
      [`install/build repo packages`, `yarn repo make`],
    ],
  }

  async execute() {
    await this.$(`yarn install --immutable`)

    await this.$(`yarn repo build`)

    await this.$(`yarn repo lint`)

    await this.$(`yarn repo test`)
  }
}
