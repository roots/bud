import {Command, Option} from '@roots/bud-support/clipanion'
import BudCommand from '@roots/bud/cli/commands/bud'

/**
 * `bud webpack` command
 */
export default class BudWebpackCommand extends BudCommand {
  /**
   * {@link Command.paths}
   */
  public static override paths = [[`webpack`]]

  /**
   * {@link Command.usage}
   */
  public static override usage = Command.Usage({
    category: `tool`,
    description: `Webpack CLI passthrough`,
    examples: [[`Run webpack`, `$0 webpack`]],
  })

  /**
   * Command options
   */
  public options = Option.Proxy({name: `webpack passthrough options`})

  /**
   * {@link Command.catch}
   */
  public override async catch() {}

  /**
   * {@link Command.execute}
   */
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    await this.run([`webpack`, `bin`, `webpack.js`], this.options)
  }
}
