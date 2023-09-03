import BudCommand from '@roots/bud/cli/commands'
import {Option} from '@roots/bud-support/clipanion'

/**
 * Bud eslint command
 */
export class BudEslintCommand extends BudCommand {
  /**
   * {@link BudCommand.paths}
   */
  public static override paths = [[`lint`, `js`], [`eslint`]]

  /**
   * {@link BudCommand.usage}
   */
  public static override usage = BudCommand.Usage({
    category: `tool`,
    description: `Run eslint on source files`,
    examples: [[`Run eslint on source files`, `$0 eslint`]],
  })

  public options = Option.Proxy({name: `eslint passthrough options`})

  /**
   * {@link BudCommand.execute}
   */
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    return await this.run([`eslint`, `bin`, `eslint.js`], this.options, [
      this.bud.path(`@src`, `**`, `*.{ts,tsx,js,jsx}`),
    ])
  }
}
