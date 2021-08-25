import {Command} from '../Command'
import {Option} from 'clipanion'

export class BuildCommand extends Command {
  static paths = [[`kjo`, `build`]]

  public cjs = Option.Boolean(`-c,--cjs`, false)
  public esm = Option.Boolean(`-e,--esm`, false)
  public clean = Option.Boolean(`--clean`, false)

  async execute() {
    const all = !this.cjs && !this.esm

    if (this.cjs || all) {
      console.log('kjo: transpiling [commonjs]')
      await this.$(`yarn tsc -b${this.clean ? ` --clean` : ``}`)

      console.log('kjo: bundling @roots/bud-support [commonjs]')
      await this.$(
        `yarn ts-node ./dev/tasks/compile/cjs @roots/bud-support`,
      )
    }

    if (this.esm || all) {
      console.log('kjo: transpiling [esmodule]')
      await this.$(
        `yarn tsc -b tsconfig.esm.json${
          this.clean ? ` --clean` : ``
        }`,
      )

      console.log('kjo: bundling @roots/bud-support [esmodule]')
      await this.$(
        `yarn ts-node ./dev/tasks/compile/esm @roots/bud-support`,
      )
    }

    this.$(`yarn kjo lint --types`)
  }
}
