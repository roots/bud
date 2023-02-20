import {join} from 'node:path'

import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/command.dry'
import {Command, Option} from '@roots/bud-support/clipanion'

@dry
export class BudStylelintCommand extends BudCommand {
  public static override paths = [
    [`lint`],
    [`lint`, `css`],
    [`lint`, `scss`],
    [`lint`, `sass`],
    [`stylelint`],
  ]

  public static override usage = Command.Usage({
    category: `tools`,
    description: `stylelint CLI passthrough`,
    examples: [
      [`View stylelint usage information`, `$0 stylelint --help`],
    ],
  })

  public options = Option.Proxy({name: `stylelint passthrough options`})

  public override async execute() {
    await this.makeBud(this)
    await this.bud.run()

    const stylelint = await this.bud.module.getDirectory(`stylelint`)
    const bin = join(stylelint, `bin`, `stylelint.js`)

    if (!this.options)
      this.options = [this.bud.path(`@src`, `**/*.{css,scss,sass}`)]

    await this.$(this.bin, [bin, ...(this.options ?? [])])
  }
}
