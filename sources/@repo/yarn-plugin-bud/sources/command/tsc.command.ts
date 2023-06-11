import {path} from '@repo/constants'
import {CommandClass, Option} from 'clipanion'

import {Command} from './base.command'

interface BundleProps {
  alias?: Record<string, string>
  external?: Array<string>
  format?: `cjs` | `esm`
  outdir?: string
  outfile?: string
  source: string
}

export class Tsc extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`, `tsc`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Run the typescript compiler`,
    examples: [
      [`run the typescript compiler`, `yarn @bud tsc`],
      [
        `run the typescript compiler in watch mode`,
        `yarn @bud tsc --watch`,
      ],
      [
        `run the typescript compiler with forced rebuild (no incremental compilation)`,
        `yarn @bud tsc --force`,
      ],
    ],
  }

  public passthrough = Option.Proxy({name: `tsc options`})

  public tsconfig = path(`config/tsconfig.json`)

  public async execute() {
    await this.promise(
      `Building source`,
      `Built source`,
      `Failed to build source`,
      this.cli.run([`tsc`, `-b`, this.tsconfig, ...this.passthrough]),
    )
  }
}
