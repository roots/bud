import type {Bud} from '@roots/bud'
import BudCommand from '@roots/bud/cli/commands/bud'
import {bind} from '@roots/bud-support/decorators'

export class BudTSCheckCommand extends BudCommand {
  /**
   * Command paths
   *
   * @public
   */
  public static override paths = [[`ts`, `check`]]

  /**
   * Comand usage
   *
   * @public
   */
  public static override usage = BudCommand.Usage({
    category: `tools`,
    description: `Typecheck source code`,
    details: `
      This command runs the \`tsc\` command with the \`--noEmit\` flag.

      It is required that a \`tsconfig.json\` file exists in the project root.
    `,
    examples: [[`bud ts check`, `Typecheck source`]],
  })

  public override dry = true

  /**
   * Command execute
   *
   * @public
   */
  @bind
  public override async runCommand(bud: Bud) {
    await bud.sh([`bud`, `tsc`, `--noEmit`])
  }
}
