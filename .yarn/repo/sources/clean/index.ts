import {Command} from '../Command'
import {Option} from 'clipanion'

export class CleanCommand extends Command {
  static paths = [[`repo`, `clean`]]
  static usage = {
    category: `repo`,
    details: `clean project artifacts files`,
    examples: [
      [`delete all project artifacts`, `yarn repo clean`],
      [`delete all untracked files`, `yarn repo clean --dfx`],
    ],
  }

  public options = {
    dfx: Option.Boolean(`-d,--dfx`, false, {
      description: `use with caution. alias for git clean -dfx. removes all files not tracked in repo. default false.`,
    }),
  }

  async execute() {
    await this.$(`yarn cache clean`)

    if (this.options.dfx) {
      await this.$(`git clean -dfx`)
      return
    }

    if (!this.options.dfx) {
      await this.$(`yarn rimraf **/.budfiles`)
      await this.$(`yarn rimraf **/node_modules`)
      await this.$(`yarn rimraf packages/@roots/*/lib`)
      await this.$(`yarn rimraf packages/@roots/*/types`)
    }
  }
}
