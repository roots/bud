import {join, resolve} from 'node:path'

import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Command, Option} from '@roots/bud-support/clipanion'

@dry
export class BudTSCCommand extends BudCommand {
  public static override paths = [[`tsc`]]

  public static override usage = Command.Usage({
    category: `tools`,
    description: `TypeScript CLI passthrough`,
    examples: [[`View tsc usage information`, `$0 tsc --help`]],
  })

  public options = Option.Proxy({name: `tsc passthrough options`})

  public override async execute() {
    await this.makeBud(this)
    const tsc = await this.bud.module.getDirectory(`tsc`)
    const bin = join(tsc, `bin`, `tsc`)

    const child = this.bud.sh(
      [`node`, bin, ...(this.options ?? [])].filter(Boolean),
      {
        cwd: resolve(process.cwd(), this.basedir ?? `./`),
      },
    )
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    await child
  }
}
