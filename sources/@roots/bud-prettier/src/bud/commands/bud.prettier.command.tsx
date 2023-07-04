import {join} from 'node:path'

import {Command, Option} from '@roots/bud-support/clipanion'
import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/dry'

@dry
export class BudPrettierCommand extends BudCommand {
  public static override paths = [[`format`], [`prettier`]]
  public static override usage = Command.Usage({
    category: `tools`,
    description: `Prettier CLI`,
    examples: [[`View prettier usage information`, `$0 prettier --help`]],
  })

  public options = Option.Proxy({name: `prettier passthrough options`})

  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    const prettier = join(
      await this.bud.module.getDirectory(`prettier`),
      `bin-prettier.js`,
    )

    if (!this.options?.length)
      this.options = [
        this.bud.path(`@src`, `**`, `*.{ts,tsx,js,jsx,css,scss,sass}`),
        `--write`,
      ]

    await this.$(this.bin, [prettier, ...this.options])
  }
}
