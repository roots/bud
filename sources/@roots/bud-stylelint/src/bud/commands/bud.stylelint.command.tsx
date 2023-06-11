import {join} from 'node:path'

import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/dry'
import {Command, Option} from '@roots/bud-support/clipanion'

/**
 * Bud stylelint command
 */
@dry
export class BudStylelintCommand extends BudCommand {
  /**
   * Command paths
   */
  public static override paths = [
    [`lint`, `css`],
    [`lint`, `scss`],
    [`lint`, `sass`],
    [`stylelint`],
  ]

  /**
   * Command usage
   */
  public static override usage = Command.Usage({
    category: `tools`,
    description: `stylelint CLI passthrough`,
    examples: [
      [`Run stylelint on source files`, `$0 lint css`],
      [`View stylelint usage information`, `$0 lint css --help`],
    ],
  })

  /**
   * Command options
   */
  public options = Option.Proxy({name: `stylelint passthrough options`})

  /**
   * Execute command
   */
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    const stylelint = await this.bud.module.getDirectory(`stylelint`)
    const bin = join(stylelint, `bin`, `stylelint.js`)

    if (!this.options?.length)
      this.options = [this.bud.path(`@src`, `**`, `*.{css,scss,sass}`)]

    await this.$(this.bin, [bin, ...this.options])
  }
}
