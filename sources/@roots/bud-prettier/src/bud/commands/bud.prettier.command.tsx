import {Command, Option} from '@roots/bud-support/clipanion'
import BudCommand from '@roots/bud/cli/commands/bud'

/**
 * `bud prettier` command
 */
export class BudPrettierCommand extends BudCommand {
  /**
   * {@link Command.paths}
   */
  public static override paths = [[`format`], [`prettier`]]

  /**
   * {@link Command.usage}
   */
  public static override usage = Command.Usage({
    category: `tool`,
    description: `Prettier CLI`,
    examples: [[`Run  prettier`, `$0 prettier`]],
  })

  /**
   * Command options
   */
  public options = Option.Proxy({name: `prettier passthrough options`})

  /**
   * {@link Command.execute}
   */
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    await this.run([`prettier`, `bin-prettier.js`], this.options, [
      this.bud.path(
        `@src`,
        `**`,
        `*.{ts,tsx,js,jsx,css,scss,sass,json,yml,yaml,md,json5,html,htm}`,
      ),
      `--write`,
    ])
  }
}
