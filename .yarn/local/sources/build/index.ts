import {Command} from '../Command'
import {Option} from 'clipanion'

export class BuildCommand extends Command {
  static paths = [[`kjo`, `build`]]

  public cjs = Option.Boolean(`-c,--cjs`, false)
  public esm = Option.Boolean(`-e,--esm`, false)
  public clean = Option.Boolean(`--clean`, false)
  public force = Option.Boolean(`--force`, false)

  async execute() {
    const all = !this.cjs && !this.esm

    if (this.cjs || all) {
      await this.$(
        `yarn tsc -b -v${this.clean ? ` --clean` : ``}${
          this.force ? ` --force` : ``
        }`,
      )

      await this.$(
        `yarn ts-node ./dev/tasks/compile/cjs @roots/bud-support`,
      )
    }

    if (this.esm || all) {
      await this.$(
        `yarn tsc -b tsconfig.esm.json -v${
          this.clean ? ` --clean` : ``
        }${this.force ? ` --force` : ``}`,
      )

      await this.$(
        `yarn ts-node ./dev/tasks/compile/esm @roots/bud-support`,
      )
    }
  }
}
