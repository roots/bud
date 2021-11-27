import {Command} from '../Command'
import {Option} from 'clipanion'

export class MakeCommand extends Command {
  static paths = [[`repo`, `make`]]
  static usage = {
    category: `repo`,
    description: `make project files same as ci`,
    examples: [[`yarn repo make`]],
  }

  async execute() {
    await this.$(`yarn install --immutable`)

    await this.$(`yarn repo build`)

    await this.$(`yarn repo lint`)

    await this.$(`yarn repo test`)
  }
}
