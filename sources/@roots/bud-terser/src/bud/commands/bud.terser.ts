import {join} from 'node:path'

import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Option} from '@roots/bud-support/clipanion'

@dry
export class BudTerserCommand extends BudCommand {
  public static override paths = [[`lint`, `js`], [`eslint`]]

  public static override usage = BudCommand.Usage({
    category: `tools`,
    description: `terser CLI passthrough`,
    examples: [[`View terser usage information`, `$0 terser --help`]],
  })

  public options = Option.Proxy({name: `terser passthrough options`})

  public override async execute() {
    await this.makeBud(this)
    await this.bud.run()

    const terser = join(
      await this.bud.module.getDirectory(`terser`, import.meta.url),
      `bin`,
      `terser`,
    )

    if (!this.options?.length)
      this.options = [this.bud.path(`@src`, `**`, `*.{ts,tsx,js,jsx}`)]

    await this.$(this.bin, [terser, ...this.options])
  }
}
