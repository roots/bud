import {CommandClass, Option} from 'clipanion'

import {Command} from '../Command'

export class CompileCommand extends Command {
  public static paths: CommandClass['paths'] = [
    [`repo`, `compile`],
  ]

  public static usage: CommandClass['usage'] = {
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

  public async execute() {
    await this.$(
      `yarn ts-node --project ./config/tsconfig.json ./dev/tasks/compile/cjs ${this.package}`,
    )

    await this.$(
      `yarn ts-node --project ./config/tsconfig.json ./dev/tasks/compile/esm ${this.package}`,
    )
  }
}
