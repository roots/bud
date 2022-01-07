import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Clean extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `clean`],
  ]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `clean project artifacts`,
    examples: [
      [`delete all untracked files`, `yarn @bud clean --dfx`],
    ],
  }

  public async execute() {
    await this.$(`yarn cache clean --all`)
    await this.$(`git clean -fxd`)
  }
}
