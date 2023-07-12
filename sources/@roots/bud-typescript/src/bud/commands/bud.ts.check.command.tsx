import {bind} from '@roots/bud-support/decorators/bind'
import BudCommand from '@roots/bud/cli/commands/bud'

/**
 * Bud ts check command
 */
export class BudTSCheckCommand extends BudCommand {
  /**
   * {@link BudCommand.paths}
   */
  public static override paths = [[`ts`, `check`]]

  /**
   * {@link BudCommand.usage}
   */
  public static override usage = BudCommand.Usage({
    category: `tool`,
    description: `Typecheck source code`,
    details: `
      This command runs the \`tsc\` command with the \`--noEmit\` flag.

      It is required that a \`tsconfig.json\` file exists in the project root.
    `,
    examples: [[`Typecheck application source`, `$0 ts check`]],
  })

  /**
   * {@link BudCommand.execute}
   */
  @bind
  public override async execute() {
    await this.makeBud()
    await this.bud.run()
    return await this.cli.run([`ts`, `--noEmit`])
  }
}
