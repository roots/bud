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
    description: `Run stylelint on source files`,
    examples: [[`Run stylelint on source files`, `$0 lint css`]],
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

    return await this.run(
      [`stylelint`, `bin`, `stylelint.mjs`],
      this.options,
      [this.bud.path(`@src`, `**`, `*.{css,sass,scss}`)],
    )
  }
}
