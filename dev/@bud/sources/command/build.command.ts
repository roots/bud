import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

export class Build extends Command {
  public static paths: CommandClass['paths'] = [
    [`@bud`, `build`],
  ]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `build project packages`,
    examples: [
      [`build packages as commonjs`, `yarn @bud build --cjs`],
      [`build packages as esm`, `yarn @bud build --esm`],
      [
        `build packages with tsc --clean flag`,
        `yarn @bud build --clean`,
      ],
      [
        `build packages with tsc --force flag`,
        `yarn @bud build --force`,
      ],
      [
        `build packages with tsc --verbose flag`,
        `yarn @bud build --verbose`,
      ],
      [
        `build packages with tsc --watch flag`,
        `yarn @bud build --watch`,
      ],
      [
        `force build commonjs verbosely`,
        `yarn @bud build --cjs --verbose --force`,
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

  public async execute() {
    const all = !this.cjs && !this.esm

    if (this.clean) {
      this.verbose = false
      this.force = false
    }

    const tsc = {
      cjs: `yarn tsc -b config/tsconfig.json${
        this.verbose ? ` --verbose` : ``
      }${this.clean ? ` --clean` : ``}${
        this.force ? ` --force` : ``
      }${this.watch ? ` --watch` : ``}`,
      esm: `yarn tsc -b config/tsconfig.esm.json${
        this.verbose ? ` --verbose` : ``
      }${this.clean ? ` --clean` : ``}${
        this.force ? ` --force` : ``
      }${this.watch ? ` --watch` : ``}`,
    }

    if (all) {
      await this.$(tsc.cjs, tsc.esm)
    } else if (this.cjs) {
      await this.$(tsc.cjs)
    } else if (this.esm) {
      await this.$(tsc.esm)
    }

    await this.$(
      `yarn @bud compile @roots/container`,
      `yarn @bud compile @roots/bud-dashboard`,
      `yarn @bud compile @roots/bud-support`,
    )
  }
}
