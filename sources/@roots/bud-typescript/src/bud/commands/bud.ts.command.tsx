import BudCommand from '@roots/bud/cli/commands'
import {Command, Option} from '@roots/bud-support/clipanion'

/**
 * Bud tsc command
 */
export class BudTSCCommand extends BudCommand {
  /**
   * {@link BudCommand.paths}
   */
  public static override paths = [[`ts`], [`tsc`]]

  /**
   * {@link BudCommand.usage}
   */
  public static override usage = Command.Usage({
    category: `tool`,
    description: `TypeScript CLI passthrough`,
    examples: [[`Run the typescript compiler`, `$0 ts`]],
  })

  /**
   * Command options
   */
  public options = Option.Proxy({name: `tsc passthrough options`})

  /**
   * {@link BudCommand.execute}
   */
  public override async execute() {
    await this.makeBud()
    await this.bud.run()
    return await this.run([`typescript`, `bin`, `tsc`], this.options)
  }
}
