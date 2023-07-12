import {join} from 'node:path'

import {Command, Option} from '@roots/bud-support/clipanion'
import BudCommand from '@roots/bud/cli/commands/bud'

/**
 * Bud stylelint command
 */
export class BudStylelintCommand extends BudCommand {
  /**
   * {@link BudCommand.paths}
   */
  public static override paths = [
    [`lint`, `css`],
    [`lint`, `scss`],
    [`lint`, `sass`],
    [`stylelint`],
  ]

  /**
   * {@link BudCommand.usage}
   */
  public static override usage = Command.Usage({
    category: `tool`,
    description: `stylelint CLI passthrough`,
    examples: [
      [`Run stylelint on source files`, `$0 lint css`],
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

    const stylelint = await this.bud.module
      .getDirectory(`stylelint`)
      .catch(this.catch)

    if (!stylelint) {
      throw `stylelint can't be resolved. You may need to install it.`
    }

    let bin = join(stylelint, `bin`, `stylelint.mjs`)
    if (!(await this.bud.fs.exists(bin))) {
      bin = join(stylelint, `bin`, `stylelint.js`)
    }

    if (!this.options?.length)
      this.options = [this.bud.path(`@src`, `**`, `*.{css,scss,sass}`)]

    await this.$(this.bin, [bin, ...this.options])
  }
}
