import BudCommand from '@roots/bud/cli/commands'
import {Option} from '@roots/bud-support/clipanion'

/**
 * {@link BudCommand}
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

    const eslintrc = Object.values(this.bud.context.files).find(
      file =>
        file.name.includes(`eslintrc`) ||
        file.name.includes(`eslint.config`),
    )?.path

    await this.run([`eslint`, `bin`, `eslint.js`], this.options, [
      `--ext`,
      `.js,.jsx,.ts,.tsx`,
      ...(eslintrc ? [`--config`, eslintrc] : []),
      this.bud.relPath(`@src`),
    ])
  }
}
