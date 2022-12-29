import {join} from 'node:path'

import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Command, Option} from '@roots/bud-support/clipanion'

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
    await this.makeBud(this)
    await this.run(this)

    const prettier = await this.bud.module.getDirectory(`prettier`)
    const bin = join(prettier, `bin-prettier.js`)

    if (!this.options)
      this.options = [
        this.bud.path(`@src`, `**/*.{ts,tsx,js,jsx,css,scss,sass}`),
        `--write`,
      ]

    await this.$(this.bin, [bin, ...(this.options ?? [])])
  }
}
