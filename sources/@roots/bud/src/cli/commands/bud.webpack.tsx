import {join} from 'node:path'

import {Command, Option} from '@roots/bud-support/clipanion'
import BudCommand from '@roots/bud/cli/commands/bud'
import {dry} from '@roots/bud/cli/decorators/dry'

/**
 * `bud webpack` command
 */
@dry
export default class BudWebpackCommand extends BudCommand {
  /**
   * {@link Command.paths}
   */
  public static override paths = [[`webpack`]]

  /**
   * {@link Command.usage}
   */
  public static override usage = Command.Usage({
    category: `tools`,
    description: `Webpack CLI passthrough`,
    examples: [[`View webpack usage information`, `$0 webpack --help`]],
  })

  public options = Option.Proxy({name: `webpack passthrough options`})

  /**
   * {@link Command.execute}
   */
  public override async execute() {
    await this.makeBud()
    await this.bud.run()

    const bin = join(
      await this.bud.module.getDirectory(`webpack`),
      `bin`,
      `webpack.js`,
    )

    this.context.stdout.write(`\n\n$ ${this.bin} ${bin}\n\n`)

    await this.$(this.bin, [
      bin,
      ...this.options.filter(key => key !== `--log`),
    ])
  }
}
