import {Command} from '../Command'
import {CommandClass, Option} from 'clipanion'

export class CompileCommand extends Command {
  static paths: CommandClass['paths'] = [[`repo`, `compile`]]
  static usage: CommandClass['usage'] = {
    category: `repo`,
    description: `compile a package`,
    details: `compiles as both cjs and esm with ncc`,
    examples: [
      [
        `compile {package name}`,
        `yarn repo compile @roots/bud-support`,
      ],
    ],
  }

  public package = Option.String()

  async execute() {
    await this.$(
      `yarn ts-node ./dev/tasks/compile/cjs ${this.package}`,
    )

    await this.$(
      `yarn ts-node ./dev/tasks/compile/esm ${this.package}`,
    )
  }
}
