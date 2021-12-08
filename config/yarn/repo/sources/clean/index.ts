import {CommandClass, Option} from 'clipanion'

import {Command} from '../Command'

export class CleanCommand extends Command {
  public static paths: CommandClass['paths'] = [
    [`repo`, `clean`],
  ]
  public static usage: CommandClass['usage'] = {
    category: `repo`,
    details: `clean project artifacts files`,
    examples: [
      [`delete all project artifacts`, `yarn repo clean`],
      [`delete all untracked files`, `yarn repo clean --dfx`],
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
