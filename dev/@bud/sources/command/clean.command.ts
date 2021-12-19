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
      [`delete all project artifacts`, `yarn @bud clean`],
      [`delete all untracked files`, `yarn @bud clean --dfx`],
    ],
  }

  public dfx = Option.Boolean(`-d,--dfx`, false, {
    description: `use with caution. alias for git clean -dfx. removes all files not tracked in repo. default false.`,
  })

  public async execute() {
    await this.$(`yarn cache clean`)

    if (this.dfx) {
      await this.$(`git clean -dfx`)
      return
    }

    if (!this.dfx) {
      await this.$(`yarn rimraf **/.budfiles`)
      await this.$(`yarn rimraf **/node_modules`)
      await this.$(`yarn rimraf packages/@roots/*/lib`)
      await this.$(`yarn rimraf packages/@roots/*/types`)
    }
  }
}
