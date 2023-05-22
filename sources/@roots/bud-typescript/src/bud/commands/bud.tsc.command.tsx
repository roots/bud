import {join} from 'node:path'

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
    await this.makeBud()
    await this.bud.run()

    const tsc = join(
      await this.bud.module.getDirectory(`typescript`, import.meta.url),
      `bin`,
      `tsc`,
    )

    await this.$(this.bin, [tsc, ...(this.options ?? [])])
  }
}
