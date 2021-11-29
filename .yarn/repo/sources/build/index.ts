import {Command} from '../Command'
import {Option} from 'clipanion'

export class BuildCommand extends Command {
  static paths = [[`repo`, `build`]]
  static usage = {
    category: `repo`,
    details: `build project packages.`,
    examples: [
      [`build packages as commonjs`, `yarn repo build --cjs`],
      [`build packages as esm`, `yarn repo build --esm`],
      [
        `build packages with tsc --clean flag`,
        `yarn repo build --clean`,
      ],
      [
        `build packages with tsc --force flag`,
        `yarn repo build --force`,
      ],
      [
        `build packages with tsc --verbose flag`,
        `yarn repo build --verbose`,
      ],
      [
        `build packages with tsc --watch flag`,
        `yarn repo build --watch`,
      ],
      [
        `force build commonjs verbosely`,
        `yarn repo build --cjs --verbose --force`,
      ],
    ],
  }

  public cjs = Option.Boolean(`-c,--cjs`, false, {
    description: `build commonjs. default true.`,
  })
  public esm = Option.Boolean(`-e,--esm`, false, {
    description: `build esmodules. default true.`,
  })
  public clean = Option.Boolean(`--clean`, false, {
    description: `build with tsc --clean flag. default false`,
  })
  public force = Option.Boolean(`--force`, false, {
    description: `build with tsc --force flag. default false.`,
  })
  public verbose = Option.Boolean(`--verbose`, true, {
    description: `build with tsc --verbose flag. default true.`,
  })
  public watch = Option.Boolean(`--watch`, false, {
    description: `build with tsc --watch flag. default false.`,
  })

  async execute() {
    if (this.clean) this.verbose = false
    if (this.clean && this.force) {
      console.error('--clean and --force are mutually exclusive')
    }

    const all = !this.cjs && !this.esm

    const tsc = {
      cjs: `yarn tsc -b tsconfig.json${
        this.verbose ? ` --verbose` : ``
      }${this.clean ? ` --clean` : ``}${
        this.force ? ` --force` : ``
      }${this.watch ? ` --watch` : ``}`,
      esm: `yarn tsc -b tsconfig.esm.json${
        this.verbose ? ` --verbose` : ``
      }${this.clean ? ` --clean` : ``}${
        this.force ? ` --force` : ``
      }${this.watch ? ` --watch` : ``}`,
    }

    if (this.all) {
      await this.$(tsc.cjs, tsc.esm)
    } else if (this.cjs) {
      await this.$(tsc.cjs)
    } else if (this.esm) {
      await this.$(tsc.esm)
    }

    await this.$(
      `yarn repo compile @roots/container`,
      `yarn repo compile @roots/bud-dashboard`,
      `yarn repo compile @roots/bud-support`,
    )
  }
}
