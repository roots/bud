import {join} from 'node:path'

import {bind} from '@roots/bud-support/decorators/bind'
import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/dry'

@dry
export class BudTSCheckCommand extends BudCommand {
  public static override paths = [[`ts`, `check`]]

  public static override usage = BudCommand.Usage({
    category: `tools`,
    description: `Typecheck source code`,
    details: `
      This command runs the \`tsc\` command with the \`--noEmit\` flag.

      It is required that a \`tsconfig.json\` file exists in the project root.
    `,
    examples: [[`bud ts check`, `Typecheck source`]],
  })

  /**
   * Command execute
   */
  @bind
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    const tsc = join(
      await this.bud.module.getDirectory(`typescript`, import.meta.url),
      `bin`,
      `tsc`,
    )

    await this.$(this.bin, [tsc, `--noEmit`])
  }
}
