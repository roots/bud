import {join, resolve} from 'node:path'

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
    const stylelint = await this.bud.module.getDirectory(`stylelint`)
    const bin = join(stylelint, `bin`, `stylelint.js`)

    if (!this.options?.length)
      this.options = [this.bud.path(`@src`, `**/*.{css,scss,sass}`)]

    await this.bud.sh(
      [`node`, bin, ...(this.options ?? [])].filter(Boolean),
      {
        cwd: resolve(process.cwd(), this.basedir ?? `./`),
      },
    )
  }
}
